import React from "react";
import rabit from "../src/images/rabbit.png";
import NavBar from "./navbar";
import AddFolder from "./addFolder";
import AddFile from "./addFile";
import Folder from "./folder";
import File from "./file";

export default function Dashboard() {
    return <div className="dashboard">
        <NavBar/>
        <div className="d-flex align-items-center">
            <AddFolder/>
            <AddFile/>
        </div>
        <div className="folder-container">
            <div className="d-flex flex-wrap">
                <div
                    style={{maxWidth: "250px"}}
                    className="p-2"
                >
                    <Folder/>
                </div>

            </div>

            <hr className="line"/>

            <div className="d-flex flex-wrap">
                <div
                    style={{maxWidth: "15rem"}}
                    className="p-2"
                >
                    <File/>
                </div>
            </div>
        </div>
        <div className="empty-folder">
            <div>
                <h1>Oops! This folder is empty.</h1>
                <h4>Add content using the buttons in the bottom-right corner.</h4>
                <h5>Till then have a look at this cute bunny...</h5>
            </div>
            <img src={rabit} alt=""/>
        </div>


    </div>
}