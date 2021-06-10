import React, {useEffect, useState} from "react";
import NavBar from "./navbar";
import {useAuth} from "../contexts/authcontext";
import {database} from "../helpers/firebase";
import rabit from "../images/rabbit.png";
import Folder from "./folder";

function Shared() {
    const [shared, setShared] = useState([])
    const {curUser} = useAuth()
    useEffect(() => {
        let share = []
        database.folders.where("shared", "array-contains", curUser.uid).get()
            .then(snap => {
                snap.forEach(x => share.push({id: x.id, ...x.data()}))
                setShared([...new Set(share)])
            })
    }, [curUser])
    return <div>
        <NavBar/>
        <div className="folder-container">
            <div className="d-flex flex-wrap">
                {shared.map(childFolder => (
                    <div
                        key={childFolder.id}
                        style={{maxWidth: "250px"}}
                        className="p-2"
                    >
                        <Folder folder={childFolder}/>
                    </div>
                ))}
            </div>
        </div>
        {shared.length === 0 && (
            <div className="empty-folder">
                <div>
                    <h1>Oops! This folder is empty.</h1>
                    <h4>When someone shares a folder to you, you will find it here.</h4>
                    <h5>Till then have a look at this cute bunny...</h5>
                </div>
                <img src={rabit} alt=""/>
            </div>
        )}
    </div>
}

export default Shared