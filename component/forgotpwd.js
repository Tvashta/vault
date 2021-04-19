import React from "react"
import {Form, Card, Alert, Container} from "react-bootstrap"
import {Link} from "react-router-dom";

export default function ForgotPassword() {
   return (
       <div className="login">
          <Container className="d-flex align-items-center  height-100vh" >
             <div className="w-100 size-400">
                <Card>
                   <Card.Body>
                      <h2 className="text-center mb-4">Password Reset</h2>
                      <Alert variant="danger">error</Alert>
                      <Alert variant="success">message</Alert>
                      <Form >
                         <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <input className="form-input" type="email"  required />
                         </Form.Group>
                         <div className="box-3">
                            <button type="submit"className="btn btn-three w-100">
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