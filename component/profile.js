import React from "react"
import {Card, Button, Alert} from "react-bootstrap"
import {Link} from "react-router-dom"

export default function Profile() {

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
                    <Alert variant="danger">error</Alert>}
                    <p><strong>Email:</strong> email</p>
                    <p><strong>Name:</strong> name</p>
                    <p><strong>Phone Number:</strong> ph</p>
                    <Link to="/update-profile" className="box3">
                        <button className="btn btn-three w-100 mt-3">
                            <span>UPDATE PROFILE</span>
                        </button>
                    </Link>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                <Button className="logout-btn" variant="link">
                    Log Out
                </Button>
            </div>
        </div>
    )
}