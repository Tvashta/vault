import React from "react"
import {Form, Card, Alert} from "react-bootstrap"
import {Link} from "react-router-dom"
import email from "../src/images/2.PNG"
import pwd from "../src/images/1.PNG"
import phImg from "../src/images/ph.PNG"
import nameImg from "../src/images/name.PNG"

export default function UpdateProfile() {
    return (
        <div className="profile">
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    <Alert variant="danger">error</Alert>
                    <Form >
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <div>
                                <img src={email} alt="" className="form-img"/>
                                <input
                                    className="form-input"
                                    type="email"
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
                                    placeholder="Leave blank to keep the same"
                                /></div>
                        </Form.Group>

                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <div>
                                 <img src={nameImg} alt="" className="form-img"/>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                /></div>
                        </Form.Group>
                        <Form.Group id="contact-no">
                            <Form.Label>Mobile Number</Form.Label>
                            <div>
                                 <img src={phImg} alt="" className="form-img"/>
                                <input
                                    className="form-input"
                                    type="number"
                                    placeholder="Mobile Number"
                                    name ="ph"
                                /></div>
                            <div className="box-3">
                                <button  type="submit" className="btn btn-three w-100">
                                    <span>UPDATE</span>
                                </button>
                            </div>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2 form-txt">
                <Link to="/profile">Cancel</Link>
            </div>
        </div>
)
}