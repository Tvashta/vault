import React, {useRef, useState} from 'react'
import {Alert, Card, Container, Form} from "react-bootstrap";
import {useAuth} from "../../contexts/authcontext";
import {Link, useHistory} from "react-router-dom";
import email from "../../images/2.PNG";
import pwd from "../../images/1.PNG";
import {auth, uiConfig} from "../../helpers/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export default function Signup(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history= useHistory()
    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch(err){
            setError(err.message)
        }

        setLoading(false)
    }
    return(
        <div className="login">
            <h1>V A U L T</h1>
        <Container className="d-flex align-items-center height-100vh" >
        <div className="w-100 size-400">
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <img src={email} alt="" className="form-img"/>
                            <input className="form-input" type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <img src={pwd} alt="" className="form-img"/>
                            <input className="form-input" type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <img src={pwd} alt="" className="form-img"/>
                            <input className="form-input" type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <div className="box-3">
                            <button disabled={loading} type="submit"className="btn btn-three w-100">
                                <span>SIGN UP</span>
                            </button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2 form-txt">
                 <Link to="/login">Already have an account? Login</Link>
            </div>
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={auth}
            />
        </div>
        </Container>
        </div>
    )
}