import React, {useState} from "react"
import ReactDOM from "react-dom"
import addFile from "../images/addFile.PNG"
import {useAuth} from "../contexts/authcontext";
import {ROOT_FOLDER} from "../helpers/useFolder";
import {database, storage} from "../helpers/firebase";
import {v4} from "uuid";
import {ProgressBar, Toast} from "react-bootstrap";

export default function AddFile({currentFolder}) {
    const [uploadingFiles, setUploadingFiles] = useState([])
    const {curUser} = useAuth()
    const id = v4()

    function handleUpload(e) {
        const file = e.target.files[0]
        if (!currentFolder || !file) return
        setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles,
            {id: id, name: file.name, progress: 0, error: false},
        ])
        const path = currentFolder.path.map(f => f.name).join("/");
        const filePath =
            currentFolder === ROOT_FOLDER
                ? `${path}/${file.name}`
                : `${path}/${currentFolder.name}/${file.name}`
        const uploadTask = storage
            .ref(`/files/${curUser.uid}/${filePath}`)
            .put(file)

        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = snapshot.bytesTransferred / snapshot.totalBytes
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadFile => {
                        if (uploadFile.id === id) {
                            return {...uploadFile, progress: progress}
                        }

                        return uploadFile
                    })
                })
            },
            () => {
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadFile => {
                        if (uploadFile.id === id) {
                            return {...uploadFile, error: true}
                        }
                        return uploadFile
                    })
                })
            },
            () => {
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.filter(uploadFile => {
                        return uploadFile.id !== id
                    })
                })

                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    database.files
                        .where("name", "==", file.name)
                        .where("user", "==", curUser.uid)
                        .where("folderId", "==", currentFolder.id)
                        .get()
                        .then(existingFiles => {
                            const existingFile = existingFiles.docs[0]
                            if (existingFile) {
                                existingFile.ref.update({url: url})
                            } else {
                                database.files.add({
                                    url: url,
                                    name: file.name,
                                    createdAt: database.getCurrentTimestamp(),
                                    folderId: currentFolder.id,
                                    user: curUser.uid,
                                })
                            }
                        })
                })
            }
        )

    }

    return (
        <div>
            <label className="add-file">
                <div className="add-folder-btn">
                    <img alt="" src={addFile}/>
                </div>
                <input type="file" onChange={handleUpload}/>
            </label>
            {uploadingFiles.length > 0 &&
            ReactDOM.createPortal(
                <div
                    style={{
                        position: "absolute",
                        bottom: "1rem",
                        left: "1rem",
                        maxWidth: "250px",
                    }}
                >
                    {uploadingFiles.map(file => (
                        <Toast
                            key={file.id}
                            onClose={() => {
                                setUploadingFiles(prevUploadingFiles => {
                                    return prevUploadingFiles.filter(uploadFile => {
                                        return uploadFile.id !== file.id
                                    })
                                })
                            }}
                        >
                            <Toast.Header
                                closeButton={file.error}
                                className="text-truncate w-100 d-block"
                            >
                                {file.name}
                            </Toast.Header>
                            <Toast.Body>
                                <ProgressBar
                                    animated={!file.error}
                                    variant={file.error ? "danger" : "primary"}
                                    now={file.error ? 100 : file.progress * 100}
                                    label={
                                        file.error
                                            ? "Error"
                                            : `${Math.round(file.progress * 100)}%`
                                    }
                                />
                            </Toast.Body>
                        </Toast>
                    ))}
                </div>,
                document.body
            )}
        </div>
    )
}