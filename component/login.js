import React from 'react'
import {Alert, Card, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import email from "../src/images/2.PNG"
import pwd from "../src/images/1.PNG";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export default function Login() {
    return (
        <div className="login">
            <h1>V A U L T</h1>
            <Container className="d-flex align-items-center height-100vh">
                <div className="w-100 size-400">
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign Up</h2>
                            <Alert variant="danger">error</Alert>}
                            <Form>
                                <Form.Group id="email">
                                    <img src={email} alt="" className="form-img"/>
                                    <input className="form-input" type="email" required/>
                                </Form.Group>
                                <Form.Group id="password">
                                    <img src={pwd} alt="" className="form-img"/>
                                    <input className="form-input" type="password" required/>
                                </Form.Group>
                                <div className="box-3">
                                    <button type="submit" className="btn btn-three w-100">
                                        <span>LOGIN</span>
                                    </button>
                                </div>

                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2 form-txt">
                        <Link to="/signup">Need an account? SignUp</Link>
                    </div>
                    <StyledFirebaseAuth/>
                </div>
            </Container>
        </div>
    )
}