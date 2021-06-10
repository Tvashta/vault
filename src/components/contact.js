import React from "react";
import NavBar from "./navbar";
import Footer from "./footer";

function Contact(){
    return <div className="dashboard">
        <NavBar/>
        <div className="folder-container">
            <div className='card-body'>
                <h2 className='text-center'>Contact Us</h2>
            </div>
            <h5>Got an revolutionary idea, want to tell us how we can be better or just how you liked us, give us a message! We would love to hear from you</h5>

        </div>
        <Footer/>
    </div>

}

export default Contact