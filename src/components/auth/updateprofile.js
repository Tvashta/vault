import React, { useRef, useState } from "react"
import { Form, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/authcontext"
import { Link, useHistory } from "react-router-dom"
import email from "../../images/2.PNG"
import pwd from "../../images/1.PNG"

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { curUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== curUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                history.push("/profile")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="profile">
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <div>
                            <img src={email} alt="" className="form-img"/>
                            <input
                                className="form-input"
                                type="email"
                                ref={emailRef}
                                required
                                defaultValue={curUser.email}
                            />
                            </div>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <div>
                            <img src={pwd} alt="" className="form-img"/>
                            <input
                                className="form-input"
                                type="password"
                                ref={passwordRef}
                                placeholder="Leave blank to keep the same"
                            />
                            </div>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <div>
                            <img src={pwd} alt="" className="form-img"/>
                            <input
                                className="form-input"
                                type="password"
                                ref={passwordConfirmRef}
                                placeholder="Leave blank to keep the same"
                            /></div>
                        </Form.Group>
                        <div className="box-3">
                            <button disabled={loading} type="submit" className="btn btn-three w-100">
                                <span>UPDATE</span>
                            </button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2 form-txt">
                <Link to="/profile">Cancel</Link>
            </div>
        </div>
    )
}