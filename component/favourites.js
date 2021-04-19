import React from "react";
import NavBar from "../src/components/navbar";
import rabit from "../src/images/rabbit.png";
import File from "./file";

function Favourites(){
    return <div>
        <NavBar/>
        <div className="folder-container">
            <div className="d-flex flex-wrap">
                    <div
                        style={{ maxWidth: "15rem" }}
                        className="p-2"
                    >
                        <File/>
                    </div>
            </div>
        </div>
            <div className="empty-folder">
                <div >
                    <h1>Oops! This folder is empty.</h1>
                    <h4>Add content using the buttons in the bottom-right corner.</h4>
                    <h5>Till then have a look at this cute bunny...</h5>
                </div>
                <img src={rabit} alt=""/>
            </div>
    </div>
}

export default Favourites