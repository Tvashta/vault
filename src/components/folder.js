import React, {useEffect, useRef, useState} from "react"
import {Link} from "react-router-dom"
import {Button, Form, Modal} from "react-bootstrap"
import { database, storage} from "../helpers/firebase";
import {ROOT_FOLDER} from "../helpers/useFolder";
import {useAuth} from "../contexts/authcontext";

export default function Folder({folder}) {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [modalState, setState]=useState(false)
    const [name, setName] =useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const node = useRef();
    const {curUser} = useAuth()
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
    }

    function renameFolder(e){
        e.preventDefault()
        database.folders.doc(folder.id).update({
            ...folder,
            name
        }).then().catch(err=>console.log(err))
        setOpen(false)
        setState(false)
    }

    function deleteFolderStorage(path) {
        const ref = storage.ref(path);
        ref.listAll()
            .then(dir => {
                dir.items.forEach(fileRef => {
                    deleteFileStorage(ref.fullPath, fileRef.name);
                });
                dir.prefixes.forEach(folderRef => {
                    deleteFolderStorage(folderRef.fullPath);
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    function deleteFileStorage(pathToFile, fileName) {
        const ref = storage.ref(pathToFile);
        const childRef = ref.child(fileName);
        childRef.delete().then().catch((e)=>console.log(e))
    }

    function recursiveDeleteFolder(fol){
        deleteFile(fol.id)
        database.folders.where("user","==", curUser.uid).where("parentId", "==", fol.id).get()
            .then((query)=>{
                query.forEach(child=>{
                    recursiveDeleteFolder(child)
                })
            })
        database.folders.doc(fol.id).delete().then().catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    function deleteFile(folderId){
        database.files.where("user", "==", curUser.uid).where("folderId","==",folderId).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    database.files.doc(doc.id).delete().then().catch(e=>console.log(e))
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    function deleteFolder(){
        setOpen(false)
        handleClose()
        const path =
            folder === ROOT_FOLDER
                ? `files/${folder.user}${folder.path.join("/")}`
                : `files/${folder.user}${folder.path.join("/")}/${folder.name}`
        deleteFolderStorage(path)
        recursiveDeleteFolder(folder)
    }

    return (
        <div>
            <Modal animation={false} show={show} onHide={handleClose}>
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
            <Modal animation={false} show={modalState} onHide={()=>setState(false)}>
                <Button variant="secondary" className="btn-x" onClick={()=>setState(false)}>
                    x
                </Button>
                <Form onSubmit={renameFolder}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>New folder Name</Form.Label>
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
                            Rename
                        </Button>
                        <Button variant="outline-dark" onClick={()=>setState(false)}>
                            Close</Button>
                    </Modal.Footer>
                </Form>
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
                <button className="dropdown-item" onClick={()=>{
                    setOpen(false)
                    setState(true)
                }}>Rename</button>
                <button className="dropdown-item" onClick={()=>{
                    setOpen(false)
                    handleShow()
                }}>Delete</button>
            </div>
            }
        </div>
    )
}