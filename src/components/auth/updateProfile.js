import React, {useEffect, useRef, useState} from "react"
import {Form, Card, Alert} from "react-bootstrap"
import {useAuth} from "../../contexts/authcontext"
import {Link, useHistory} from "react-router-dom"
import email from "../../images/2.PNG"
import pwd from "../../images/1.PNG"
import phImg from "../../images/ph.PNG"
import nameImg from "../../images/name.PNG"
import {database, storage} from "../../helpers/firebase";
import profile from "../../images/profile.jpg";

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {curUser, updatePassword, updateEmail} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [img, setImg] = useState('')
    const history = useHistory()
    const [name, setName] = useState("")
    const [ph, setPh] = useState("")
    const [org, setOrg] = useState("")
    useEffect(()=>{
        database.users.where("user", "==", curUser.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setPh(doc.data().ph)
                    setName(doc.data().name)
                    setOrg(doc.data().org)
                    setImg(doc.data().profile)
                });
            })
            .catch((err) => {
                console.log("Error getting documents: ", err);
            });
    },[curUser])

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

        database.users.where("user", "==", curUser.uid)
            .get()
            .then((querySnapshot) => {
                if(querySnapshot.empty){
                    database.users.add({
                        name,
                        ph,
                        org,
                        user: curUser.uid,
                        email: curUser.email
                    })
                }
                querySnapshot.forEach((doc) => {
                    database.users.doc(doc.id).update({name, ph, org, user: curUser.uid, email: curUser.email})
                });
            })
            .catch((err) => {
                console.log("Error getting documents: ", err);
            });

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

    function uploadImg(e){
        const file = e.target.files[0]
        storage
            .ref(`/users/${curUser.uid}`)
            .put(file)
            .then((snapshot)=>{
                snapshot.ref.getDownloadURL().then(url => {
                    console.log(url)
                    database.users.where('user','==', curUser.uid).get().then((snap)=>{
                        snap.forEach(x =>{
                            database.users.doc(x.id).update('profile', url).then(r => setImg(url))
                        })
                    })

                })
            });
    }

    return (
        <div className="profile">
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <label htmlFor="photo-upload" className="custom-file-upload fas">
                            <div className="img-wrap img-upload">
                                <img src={img?img:profile} alt='profile'/>
                            </div>
                            <input id="photo-upload" type="file" onChange={(e)=>uploadImg(e)}/>
                        </label>
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

                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <div>
                                 <img src={nameImg} alt="" className="form-img"/>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    name="name"
                                    onChange={(e)=>setName(e.target.value)}
                                /></div>
                        </Form.Group>

                        <Form.Group id="name">
                            <Form.Label>Organization</Form.Label>
                            <div>
                                <img src={nameImg} alt="" className="form-img"/>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="Enter your orgnaization"
                                    value={org}
                                    name="org"
                                    onChange={(e)=>setOrg(e.target.value)}
                                /></div>
                        </Form.Group>

                        <Form.Group id="contact-no">
                            <Form.Label>Mobile Number</Form.Label>
                            <div>
                                 <img src={phImg} alt="" className="form-img"/>
                                <input
                                    className="form-input"
                                    type="number"
                                    value={ph}
                                    placeholder="Mobile Number"
                                    name ="ph"
                                    onChange={(e)=>setPh(e.target.value)}
                                /></div>
                            <div className="box-3">
                                <button disabled={loading} type="submit" className="btn btn-three w-100">
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