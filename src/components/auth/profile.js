import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/authcontext"
import { Link, useHistory } from "react-router-dom"

export default function Profile() {
    const [error, setError] = useState("")
    const { curUser, logout } = useAuth()
    const history = useHistory()

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
                <span className="btn-label">Go back</span>
            </Button>
            </div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {curUser.email}
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