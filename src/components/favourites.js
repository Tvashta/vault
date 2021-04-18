import React, {useEffect, useState} from "react";
import NavBar from "./navbar";
import {useAuth} from "../contexts/authcontext";
import {database} from "../helpers/firebase";
import File from "./file";
import rabit from "../images/rabbit.png";
function Favourites(){
    const [fav, setFav] = useState([])
    const {curUser} = useAuth()
    useEffect(()=>{
        database.files.where("user", "==", curUser.uid).where("favourite","==",true)
            .onSnapshot(snapshot => {
                setFav(snapshot.docs.map(database.formatDoc))
        })
    },[curUser])
    return<div>
       <NavBar/>
        <div className="folder-container">
        <div className="d-flex flex-wrap">
            {fav.map(file => (
                <div
                    key={file.id}
                    style={{ maxWidth: "15rem" }}
                    className="p-2"
                >
                    <File file={file} />
                </div>
            ))}
        </div>
        </div>
        {fav.length===0 &&(
            <div className="empty-folder">
                <div >
                    <h1>Oops! This folder is empty.</h1>
                    <h4>Add content using the buttons in the bottom-right corner.</h4>
                    <h5>Till then have a look at this cute bunny...</h5>
                </div>
                <img src={rabit} alt=""/>
            </div>
        )}
    </div>
}

export default Favourites