import React, {useEffect, useState} from "react";
import { useLocation, useParams} from "react-router-dom";
import AddFolder from "./addFolder";
import {useFolder} from "../helpers/useFolder";
import Folder from "./folder";
import FolderPath from "./path";
import AddFile from "./addFile";
import rabit from "../images/rabbit.png"
import File from "./file";
import NavBar from "./navbar";

export default function Dashboard(){
    const { folderId } = useParams()
    const { state = {} } = useLocation()
    const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)
    const [flag, wait]=useState(false)
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