import React, { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import {useAuth} from "../contexts/authcontext";
import {database} from "../helpers/firebase";
import {ROOT_FOLDER} from "../helpers/useFolder";
import addFolder from "../images/addFolder.PNG"

export default function AddFolder({ currentFolder }) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const { curUser } = useAuth()

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (currentFolder == null) return

        const path = [...currentFolder.path]
        if (currentFolder !== ROOT_FOLDER) {
            path.push({ name: currentFolder.name, id: currentFolder.id })
        }

        database.folders.add({
            name,
            parentId: currentFolder.id,
            user: curUser.uid,
            path: path,
            date: database.getCurrentTimestamp(),
        })
        setName("")
        closeModal()
    }

    return (
        <>
            <button onClick={openModal} className="add-folder-btn">
               <img alt="" src={addFolder}/>
            </button>
            <Modal animation={false} show={open} onHide={closeModal}>
                <Button variant="secondary" className="btn-x" onClick={closeModal}>
                    x
                </Button>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="success" type="submit">
                            Add Folder
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}