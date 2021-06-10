import React, {useRef, useState} from "react";
import NavBar from "./navbar";
import {useAuth} from "../contexts/authcontext";
import firebase from "firebase/app";
import 'firebase/firestore';
import {useCollectionData} from "react-firebase-hooks/firestore";
import {database} from "../helpers/firebase";
import userPic from "../images/user.png"

function Chat() {
    const {curUser} = useAuth()

    function ChatRoom() {
        const dummy = useRef();
        const messagesRef = database.messages
        const query = messagesRef.orderBy('createdAt').limit(25);
        const [messages] = useCollectionData(query, {idField: 'id'});
        const [formValue, setFormValue] = useState('');

        const sendMessage = async (e) => {
            e.preventDefault();
            const {uid, photoURL} = curUser;
            await messagesRef.add({
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL
            })
            setFormValue('');
            dummy.current.scrollIntoView({behavior: 'smooth'});
        }

        return (<>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
                <span ref={dummy}/>
            </main>

            <form onSubmit={sendMessage}>
                <input className='form-input' value={formValue} onChange={(e) => setFormValue(e.target.value)}
                       placeholder="Start Connecting ..."/>
                <button type="submit" disabled={!formValue}>🚀</button>
            </form>
        </>)
    }


    function ChatMessage(props) {
        const {text, uid, photoURL} = props.message;
        const messageClass = uid === curUser.uid ? 'sent' : 'received';
        return (<>
            <div className={`message ${messageClass}`}>
                <img alt='dp' className='profilePic' src={photoURL || userPic}/>
                <p>{text}</p>
            </div>
        </>)
    }

    return <div className="dashboard">
        <NavBar/>
        <div className="chat">
            <section>
                {curUser ? <ChatRoom/> : <div/>}
            </section>
        </div>
    </div>

}

export default Chat