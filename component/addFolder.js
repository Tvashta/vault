import React from "react"
import addFolder from "../src/images/addFolder.PNG";
import {Button, Form, Modal} from "react-bootstrap";

export default function AddFolder() {
    return <>
        <button className="add-folder-btn">
            <img alt="" src={addFolder}/>
        </button>
        <Modal animation={false}>
            <Button variant="secondary" className="btn-x">
                x
            </Button>
            <Form>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Folder Name</Form.Label>
                        <Form.Control
                            type="text"
                            required

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
}