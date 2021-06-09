import React, {useEffect, useState} from "react";
import { useLocation, useParams} from "react-router-dom";
import AddFolder from "./addFolder";
import {useFolder} from "../helpers/useFolder";
import Folder from "./folder";
import FolderPath from "./folderPath";
import AddFile from "./addFile";
import rabit from "../images/rabbit.png"
import File from "./file";
import NavBar from "./navbar";

export default function Dashboard(){
    const { folderId } = useParams()
    const { state = {} } = useLocation()
    const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)
    const [folders, setFolders] = useState([])
    const [flag, wait]=useState(false)
    useEffect(()=>setFolders([...childFolders]), [childFolders])
    useEffect(()=>{
        wait(false)
    },[folder])
    setTimeout(()=>{
        wait(true)
    },3000)
    return <div className="dashboard">
        <NavBar/>
        <div className="d-flex align-items-center">
            <FolderPath currentFolder={folder}/>
            <AddFolder currentFolder={folder} />
            <AddFile currentFolder={folder}/>
            <div className="search-bar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#05505B"
                     className="bi bi-search form-img" viewBox="0 0 18 18">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                <input className='form-input' placeholder='Search' type='text'  onChange={(e)=> setFolders([...childFolders.filter(x => x.name.startsWith(e.target.value))])}/>
            </div>
        </div>
        <div className="folder-container">
            {childFolders.length > 0 && (
                <div className="d-flex flex-wrap">
                    {folders.map(childFolder => (
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
            {childFolders.length > 0 && childFiles.length > 0 && <hr className="line"/>}
            {childFiles.length > 0 && (
                <div className="d-flex flex-wrap">
                    {childFiles.map(childFile => (
                        <div
                            key={childFile.id}
                            style={{ maxWidth: "15rem" }}
                            className="p-2"
                        >
                            <File file={childFile} />
                        </div>
                    ))}
                </div>
            )}
        </div>
        {flag && (childFolders.length===0&& childFiles.length===0 &&(
            <div className="empty-folder">
            <div >
                <h1>Oops! This folder is empty.</h1>
                <h4>Add content using the buttons in the bottom-right corner.</h4>
                <h5>Till then have a look at this cute bunny...</h5>
            </div>
            <img src={rabit} alt=""/>
            </div>
        ))}

    </div>
}