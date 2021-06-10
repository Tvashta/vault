import React, {useState} from "react";
import NavBar from "./navbar";
import Footer from "./footer";
import {Card, Form} from "react-bootstrap";
import email from "../images/2.PNG";
import nameImg from "../images/name.PNG";
import {database} from "../helpers/firebase";

function Contact() {
    const [details, setDetails] = useState({name: '', email: '', msg: ''})
    return <div className="dashboard">
        <NavBar/>
        <div className="profile">
            <Card>
                <Card.Body>
                    <h2 className='text-center'>Contact Us</h2>
                    <h5>Got an revolutionary idea, want to tell us how we can be better or just how you liked us, give
                        us a message! We would love to hear from you</h5>
                    <Form onSubmit={(e) => {
                        e.preventDefault()
                        database.feedback.add(details).then(snap => setDetails({name: '', email: '', msg: ''}))
                    }
                    }>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <div>
                                <img src={email} alt="" className="form-img"/>
                                <input
                                    className="form-input"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your mail id"
                                    onChange={(e) => setDetails({...details, [e.target.name]: e.target.value})}
                                    required
                                />
                            </div>
                        </Form.Group>
                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <div>
                                <img src={nameImg} alt="" className="form-img"/>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="Enter your name"
                                    onChange={(e) => setDetails({...details, [e.target.name]: e.target.value})}
                                    name="name"
                                /></div>
                        </Form.Group>
                        <Form.Group id="name">
                            <Form.Label>Message</Form.Label>
                            <div>
                                    <textarea
                                        className="form-input"
                                        rows="6"
                                        cols="50"
                                        placeholder="Tell us what you feel"
                                        name="msg"
                                        onChange={(e) => setDetails({...details, [e.target.name]: e.target.value})}
                                    /></div>
                        </Form.Group>
                        <div className="box-3">
                            <button type="submit" className="btn btn-three w-100">
                                <span>SEND</span>
                            </button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
        <Footer/>
    </div>

}

export default Contact