import React, {useEffect, useRef, useState} from "react"
import {Link} from "react-router-dom"
import {Button, Form, Modal} from "react-bootstrap"
import {database, storage} from "../helpers/firebase";
import {ROOT_FOLDER} from "../helpers/useFolder";
import {useAuth} from "../contexts/authcontext";


export default function Folder({folder}) {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [modalState, setState] = useState(false)
    const [name, setName] = useState("")
    const [share, setShare] = useState(false)
    const [users, setUsers] = useState([])
    const [shared, setShared] = useState([])
    const [user, setUser] = useState("")

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
        let users1 = []
        database.users.where("user", "==", curUser.uid).get()
            .then(snap => {
                snap.forEach(i => {
                    database.users.where("org", "==", i.data().org).get()
                        .then(snap1 => {
                            snap1.forEach(j => {
                                if (!users1.includes(j.data()) && j.data().user !== curUser.uid)
                                    users1.push(j.data())
                            })
                        })
                })
            })
        setUsers(users1)
    }, [curUser.uid])

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
        if (folder.user === curUser.uid) {
            database.folders.doc(folder.id).get()
                .then(d => setShared([...new Set(shared.concat(d.data().shared))]))
                .catch(err => console.log(err))
            e.preventDefault()
            setOpen(true)
        }
    }

    function renameFolder(e) {
        e.preventDefault()
        database.folders.doc(folder.id).update({
            ...folder,
            name
        }).then().catch(err => console.log(err))
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
        childRef.delete().then().catch((e) => console.log(e))
    }

    function recursiveDeleteFolder(fol) {
        deleteFile(fol.id)
        database.folders.where("user", "==", curUser.uid).where("parentId", "==", fol.id).get()
            .then((query) => {
                query.forEach(child => {
                    recursiveDeleteFolder(child)
                })
            })
        database.folders.doc(fol.id).delete().then().catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    function deleteFile(folderId) {
        database.files.where("user", "==", curUser.uid).where("folderId", "==", folderId).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    database.files.doc(doc.id).delete().then().catch(e => console.log(e))
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    function deleteFolder() {
        setOpen(false)
        handleClose()
        const path =
            folder === ROOT_FOLDER
                ? `files/${folder.user}${folder.path.join("/")}`
                : `files/${folder.user}${folder.path.join("/")}/${folder.name}`
        deleteFolderStorage(path)
        recursiveDeleteFolder(folder)
    }

    function shareFolder() {
        let share = shared.filter(x => x !== undefined)
        database.folders.doc(folder.id).update("shared", share)
            .then(() => setShare(false)).catch(err => console.log(err))
    }

    function addUser() {
        if (user && user !== '1' && !shared.includes(user) && users.filter(x => x.user === user).length !== 0) {
            setShared([...shared, user])
        }
    }

    return (
        <div>
            <Modal animation={false} show={show} onHide={handleClose}>
                <Modal.Body>
                    <Button variant="secondary" className="btn-x" onClick={handleClose}>
                        x
                    </Button>
                    <h3>Are you sure?</h3>
                    <p>Deleting would erase all contents of this folder permanently</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        No! Go back
                    </Button>
                    <Button variant="danger" onClick={deleteFolder}>
                        Yes! Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal animation={false} show={modalState} onHide={() => setState(false)}>
                <Button variant="secondary" className="btn-x" onClick={() => setState(false)}>
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
                        <Button variant="outline-dark" onClick={() => setState(false)}>
                            Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal animation={false} show={share} onHide={() => setShare(false)}>
                <Modal.Body>
                    <Button variant="secondary" className="btn-x" onClick={() => setShare(false)}>
                        x
                    </Button>
                    <h3>Share this folder</h3>
                    {users && shared && shared.filter(x => x !== undefined).map(x => <div className="shareItems"
                                                                                          key={x}>
                        <button onClick={() => setShared(shared.filter(y => y !== x))}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#f05454"
                                 className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path
                                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                        <p>{users.filter(y => y.user === x)[0].name}</p>
                    </div>)}
                    <p>Click on the plus sign to add users</p>
                    <div className="input-group">
                        <select className="custom-select" id="inputGroupSelect04"
                                onChange={(e) => setUser(e.target.value)}>
                            <option defaultValue="1">Add user to folder</option>
                            {users.map((val, i) => (<option key={i} value={val.user}> {val.name}</option>))}
                        </select>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={addUser}>Add</button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => setShare(false)}>
                        No! Go back
                    </Button>
                    <Button variant="success" onClick={shareFolder}>
                        Yes! Share em all!
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
                <button className="dropdown-item" onClick={() => {
                    setOpen(false)
                    setState(true)
                }}>Rename
                </button>
                <button className="dropdown-item" onClick={() => {
                    setOpen(false)
                    handleShow()
                }}>Delete
                </button>
                <button className="dropdown-item" onClick={() => {
                    setShare(true)
                    setOpen(false)
                }}>Share
                </button>
            </div>
            }
        </div>
    )
}