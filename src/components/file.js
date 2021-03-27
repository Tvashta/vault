import React from "react"
import defaultFile from "../images/defaultFile.jfif"
export default function File({ file }) {
    return (

        <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="file"
        >
            <div className="img-zoom">
           <img src={["jpg", "png", "PNG","jfif", "jpeg"].includes(file.name.split(".")[1]) ?file.url: defaultFile} alt={file.name}/>
            </div>
            <p className="text-truncate">{file.name}</p>
        </a>
       )
}