import React from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

export default function Folder({ folder }) {
    return (
        <Button
            to={{
                pathname: `/folder/${folder.id}`,
                state: { folder: folder },
            }}
            variant="outline-light"
            className="text-truncate w-100"
            as={Link}
        >
            <span className="btn-label">{folder.name}</span>
        </Button>
    )
}