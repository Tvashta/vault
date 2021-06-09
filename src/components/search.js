import React, {useEffect, useState} from "react";
import NavBar from "./navbar";
import {useAuth} from "../contexts/authcontext";
import {database} from "../helpers/firebase";
import Folder from "./folder";

function Search(){
    const [folders, setFolders]= useState([])
    const [fold, setFold] = useState([])
    const {curUser} = useAuth()
    useEffect(()=>{
        let fol=[]
        database.folders.where("user","==",curUser.uid).get()
            .then((snap)=>{
                snap.forEach(x => fol.push( {id: x.id, ...x.data()}))
                setFolders([...new Set(fol)])
                setFold([...new Set(fol)])
            })
    }, [curUser])
    return <div className="dashboard">
        <NavBar/>
        <input className='form-input search' placeholder='Type to Filter' type='text' onChange={(e)=> setFolders([...fold.filter(x => x.name.startsWith(e.target.value))])} />
        <div className="folder-container">
            {folders.length > 0 && (
                <div className="d-flex flex-wrap">
                    {folders.map(childFolder => (
                        <div
                            key={childFolder.id}
                            style={{ maxWidth: "250px" }}
                            className="p-2"
                        >
                            <Folder folder={childFolder} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>

}

export default Search