import React from "react"
import {Breadcrumb} from "react-bootstrap"
import {Link} from "react-router-dom"

export default function FolderPath() {
    return (
        <Breadcrumb
            className="flex-grow-1"
            listProps={{className: "bg-trans m-0 ml-6"}}
        >
            <Breadcrumb.Item
                linkAs={Link}
                className="text-truncate d-inline-block path-item"
                style={{maxWidth: "150px"}}
            >
                Folder Name
            </Breadcrumb.Item>

            <Breadcrumb.Item
                className="text-truncate d-inline-block path-item"
                style={{maxWidth: "200px"}}
                active
            >
                Folder Name
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}