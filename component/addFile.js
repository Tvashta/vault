import React from "react"
import addFile from "../src/images/addFile.PNG";
import {ProgressBar, Toast} from "react-bootstrap";

export default function AddFile() {
    return <div>
        <label className="add-file">
            <div className="add-folder-btn">
                <img alt="" src={addFile}/>
            </div>
            <input type="file"/>
        </label>
        ReactDOM.createPortal(
        <div
            style={{
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
                maxWidth: "250px",
            }}
        >

            <Toast>
                <Toast.Header

                    className="text-truncate w-100 d-block"
                >
                    abc
                </Toast.Header>
                <Toast.Body>
                    <ProgressBar

                    />
                </Toast.Body>
            </Toast>

        </div>,
        document.body)

    </div>
}