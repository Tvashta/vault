import React, {useEffect, useState} from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/authcontext"
import { Link, useHistory } from "react-router-dom"
import {database} from "../../helpers/firebase";

export default function Profile() {
    const [error, setError] = useState("")
    const { curUser, logout } = useAuth()
    const [name, setName] = useState("")
    const [ph, setPh] = useState("")
    const [org, setOrg]=useState("")
    const history = useHistory()

    useEffect(()=>{
        database.users.where("user", "==", curUser.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setName(doc.data().name)
                    setPh(doc.data().ph)
                    setOrg(doc.data().org)
                });
            })
            .catch((err) => {
                console.log("Error getting documents: ", err);
            });
    },[curUser])

    async function handleLogout() {
        setError("")
        try {
            history.push("/login")
            await logout()
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <div className="profile">
            <div className="back-btn">
            <Button
                to="/"
                variant="outline-light"
                className="text-truncate w-100"
                as={Link}
            >
                <span className="btn-label">Back</span>
            </Button>
            </div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <p><strong>Email:</strong> {curUser.email}</p>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Phone Number:</strong> {ph}</p>
                    <p><strong>Organization:</strong> {org}</p>
                    <Link to="/update-profile" className="box3">
                        <button className="btn btn-three w-100 mt-3">
                            <span>UPDATE PROFILE</span>
                        </button>
                    </Link>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                <Button className="logout-btn" variant="link" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </div>
    )
}