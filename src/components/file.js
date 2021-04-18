import React, {useEffect, useRef, useState} from "react"
import defaultFile from "../images/defaultFile.jfif"
import {database} from "../helpers/firebase";

export default function File({ file }) {
    const [open, setOpen] = useState(false);
    const node = useRef();

    function handleClickOutside(e) {
        if (node.current.contains(e.target)) {
            return;
        }
        setOpen(false);
    }
    function handleRightClick(e) {
        e.preventDefault()
        setOpen(true)
    }
    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);


    function favourite(e){
        e.preventDefault()
        database.files.doc(file.id).update({
            ...file,
            favourite: true,
        }).then().catch(e=>console.log(e))
        setOpen(false)
    }

    return (
    <div>
        <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="file"
            onContextMenu={handleRightClick}
        >
            <div className="img-zoom">
           <img src={["jpg", "png", "PNG","jfif", "jpeg"].includes(file.name.split(".")[1]) ?file.url: defaultFile} alt={file.name}/>
            </div>
            <p className="text-truncate">{file.name}</p>
        </a>
        {open &&
        <div ref={node} className="drop-down">
            <button className="dropdown-item" onClick={favourite}>Favourite</button>
        </div>
        }
    </div>
       )
}