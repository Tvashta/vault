import React, {useEffect, useRef, useState} from "react"
import {Link} from "react-router-dom"
import {Button, Modal} from "react-bootstrap"

export default function Folder({folder}) {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const node = useRef();
    function handleClickOutside(e) {
        if (node.current.contains(e.target)) {
            return;
        }
        setOpen(false);
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

    function handleRightClick(e) {

        e.preventDefault()
        setOpen(true)
        console.log(folder.name)
    }

    function renameFolder(e){
        console.log("Rename")
        setOpen(false)
    }

    function deleteFolder(){
        console.log(folder)
    }



    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Button variant="secondary" className="btn-x" onClick={handleClose}>
                        x
                    </Button>
                    <h3>Are you sure?</h3>
                    <p>Deleting would erase all contents of this folder permanently</p></Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        No! Go back
                    </Button>
                    <Button variant="danger" onClick={deleteFolder}>
                        Yes! Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Button
                to={{
                    pathname: `/folder/${folder.id}`,
                    state: {folder: folder},
                }}
                variant="outline-light"
                className="text-truncate w-100"
                onContextMenu={handleRightClick}
                as={Link}
            >
                <span className="btn-label">{folder.name}</span>
            </Button>
            {open &&
            <div ref={node} className="drop-down">
                <button className="dropdown-item" onClick={renameFolder}>Rename</button>
                <button className="dropdown-item" onClick={()=>{
                    setOpen(false)
                    handleShow()
                }}>Delete</button>
            </div>
            }
        </div>
    )
}