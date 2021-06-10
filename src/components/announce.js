import React, {useEffect, useState} from "react";
import NavBar from "./navbar";
import {Card, Form} from "react-bootstrap";
import {database} from "../helpers/firebase";
import nameImg from "../images/name.PNG";
import Footer from "./footer";
import {useAuth} from "../contexts/authcontext";
import {send} from 'emailjs-com';

function Announce() {
    const [users, setUsers] = useState([])
    const [announced, setAnnounced] = useState([])
    const [user, setUser] = useState("")
    const {curUser} = useAuth()
    const [content, setContent] = useState({sub: '', msg: ''})

    useEffect(() => {
        let temp = []
        database.users.where("user", "==", curUser.uid).get()
            .then(snap => {
                snap.forEach(i => {
                    database.users.where("org", "==", i.data().org).get()
                        .then(s => {
                            s.forEach(j => {
                                if (j.data().user !== curUser.uid && !temp.includes(j.data()))
                                    temp.push(j.data())
                            })
                            setUsers(temp)
                            setAnnounced([])
                        })
                })
            })
    }, [curUser.uid])


    function handleAnnounce(e) {
        e.preventDefault()
        let from_name, to_email = ''
        database.users.where("user", "==", curUser.uid).get().then(snap => {
            snap.forEach(s => from_name = s.data().name)
            announced.forEach(x => {
                to_email += users.filter(y => y.user === x)[0].email + ', '
            })
            let mail = {
                ...content,
                from_name,
                from_email: curUser.email,
                to_email: to_email.slice(0, -2)
            }
            send(
                'service_8t2kg92',
                'template_5m2l10q',
                mail,
                'user_6ewufOM5MPiYQHHqNYnnP'
            )
                .then((response) => {
                    setContent({sub: '', msg: ''})
                    console.log('SUCCESS!', response.status, response.text);
                })
                .catch((err) => {
                    console.log('FAILED...', err);
                });
        })

    }


    return <div className="dashboard">
        <NavBar/>
        <div className="profile">
            <Card>
                <Card.Body>
                    <h2 className='text-center'>Announce</h2>
                    <Form onSubmit={handleAnnounce}>
                        <Form.Group id="sub">
                            <Form.Label>Name</Form.Label>
                            <div>
                                <img src={nameImg} alt="" className="form-img"/>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="Subject"
                                    onChange={(e) => setContent({...content, [e.target.name]: e.target.value})}
                                    name="sub"
                                    value={content.sub}
                                /></div>
                        </Form.Group>
                        <Form.Group id="msg">
                            <Form.Label>Message</Form.Label>
                            <div>
                                    <textarea
                                        onChange={(e) => setContent({...content, [e.target.name]: e.target.value})}
                                        className="form-input"
                                        rows="6"
                                        cols="50"
                                        placeholder="Tell us what you feel"
                                        name="msg"
                                        value={content.msg}
                                    /></div>
                        </Form.Group>
                        <Form.Group id='toMail'>
                            <Form.Label>Click on the plus sign to add users</Form.Label>
                            <div className="input-group">
                                <select className="custom-select form-input" onChange={(e) => setUser(e.target.value)}>
                                    <option defaultValue="1">Add user to folder</option>
                                    {users.map((val, i) => (<option key={i} value={val.user}> {val.name}</option>))}
                                </select>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" onClick={(e) => {
                                        if (user && user !== '1' && !announced.includes(user) && users.filter(x => x.user === user).length !== 0) {
                                            setAnnounced([...announced, user])
                                        }
                                    }
                                    }>+
                                    </button>
                                </div>
                            </div>
                        </Form.Group>
                        {users && announced && announced.filter(x => x !== undefined).map(x => <div
                            className="shareItems" key={x}>
                            <button onClick={() => setAnnounced(announced.filter(y => y !== x))}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#f05454"
                                     className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </button>
                            <p>{users.filter(y => y.user === x)[0].name}</p>
                        </div>)}
                        <div className="box-3">
                            <button type="submit" className="btn btn-three w-100">
                                <span>SEND</span>
                            </button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
        <Footer/>
    </div>

}

export default Announce