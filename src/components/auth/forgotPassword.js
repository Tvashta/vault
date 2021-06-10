import React, {useRef, useState} from "react"
import {Form, Card, Alert, Container} from "react-bootstrap"
import {useAuth} from "../../contexts/authcontext"
import {Link} from "react-router-dom"

export default function ForgotPassword() {
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }

        setLoading(false)
    }

    return (
        <div className="login">
            <Container className="d-flex align-items-center  height-100vh">
                <div className="w-100 size-400">
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Password Reset</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <input className="form-input" type="email" ref={emailRef} required/>
                                </Form.Group>
                                <div className="box-3">
                                    <button disabled={loading} type="submit" className="btn btn-three w-100">
                                        <span>RESET PASSWORD</span>
                                    </button>
                                </div>
                            </Form>
                            <div className="w-100 text-center form-txt mt-3">
                                <Link to="/login">Login</Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2 form-txt">
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}