import React from "react"
export default function File() {
    return (
        <div>
            <a
                target="_blank"
                rel="noopener noreferrer"
                className="file"
            >
                <div className="img-zoom">
                    <img
                       />
                </div>
                <p className="text-truncate">File name</p>
            </a>
            <div className="drop-down">
                <button className="dropdown-item">Favourite</button>
            </div>

        </div>
    )
}