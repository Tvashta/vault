import React from "react"
import {Link} from "react-router-dom"
import {Button, Form, Modal} from "react-bootstrap"

export default function Folder() {
    return (
        <div>
            <Modal>
                <Modal.Body>
                    <Button variant="secondary" className="btn-x">
                        x
                    </Button>
                    <h3>Are you sure?</h3>
                    <p>Deleting would erase all contents of this folder permanently</p></Modal.Body>
                <Modal.Footer>
                    <Button variant="light">
                        No! Go back
                    </Button>
                    <Button variant="danger">
                        Yes! Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal animation={false}>
                <Button variant="secondary" className="btn-x">
                    x
                </Button>
                <Form>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>New folder Name</Form.Label>
                            <Form.Control
                                type="text"
                                required

                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            Rename
                        </Button>
                        <Button variant="outline-dark">
                            Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Button
                variant="outline-light"
                className="text-truncate w-100"
                as={Link}
            >
                <span className="btn-label">Name</span>
            </Button>

            <div className="drop-down">
                <button className="dropdown-item">Rename</button>
                <button className="dropdown-item">Delete</button>
            </div>

        </div>
    )
}