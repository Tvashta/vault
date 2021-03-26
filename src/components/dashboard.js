import React, {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import AddFolderButton from "./addFolder";
import {useFolder} from "../helpers/useFolder";
import Folder from "./folder";
import FolderPath from "./path";
import rabit from "../images/rabbit.png"
export default function Dashboard(){
    const { folderId } = useParams()
    const { state = {} } = useLocation()
    const { folder, childFolders } = useFolder(folderId, state.folder)
    const [flag, wait]=useState(false)
    useEffect(()=>{
        wait(false)
    },[folder])
    setTimeout(()=>{
        wait(true)
    },3000)
    return <div className="dashboard">
        <nav className="navbar navbar-dark navbar-expand-sm justify-content-between" >
            <Link to="/" className="navbar-brand mb-0 h1">V A U L T</Link>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">Profile </Link>
                </li>
            </ul>
        </nav>

        <div className="d-flex align-items-center">
            <FolderPath currentFolder={folder}/>
            <AddFolderButton currentFolder={folder} />
        </div>
        <div className="folder-container">
            {childFolders.length > 0 && (
                <div className="d-flex flex-wrap">
                    {childFolders.map(childFolder => (
                        <div
                            key={childFolder.id}
                            style={{ maxWidth: "250px" }}
                            className="p-2"
                        >
                            <Folder folder={childFolder} />
                        </div>
                    ))}
                </div>
            )}

        </div>
        {flag && (childFolders.length===0&&(
            <div className="empty-folder">
            <div >
                <h1>Oops! This folder is empty.</h1>
                <h4>Add folders using the button in the bottom-right corner.</h4>
                <h5>Till then have take a look at this cute bunny...</h5>
            </div>
            <img src={rabit} alt=""/>
            </div>
        ))}

    </div>
}