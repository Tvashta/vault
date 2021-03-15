import React from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import AddFolderButton from "./addFolder";
import {useFolder} from "../helpers/useFolder";
import Folder from "./folder";
export default function Dashboard(){
    const { folderId } = useParams()
    const { state = {} } = useLocation()
    const { folder, childFolders } = useFolder(folderId, state.folder)
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

    </div>
}