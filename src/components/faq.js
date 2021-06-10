import React from "react";
import NavBar from "./navbar";
import Footer from "./footer";

function FAQ() {
    return <div className="dashboard">
        <NavBar/>
        <div className='folder-container'>
            <div className='card-body'>
                <h2 className='text-center'>Frequently Asked Questions [FAQ]</h2>
            </div>
            <div className='faq'>
                <h4>What are the features that vault offers?</h4>
                <h6>1. Custom Directory Structure</h6>
                <h6>2. Share folders and view folders shared with you</h6>
                <h6>3. Announce something to selected people in your organization</h6>
                <h6>4. Search folders with ease</h6>
                <h6>5. And so much more!</h6>

                <h4>How to use Digital Course file?</h4>
                <h6>Step 1: Go to Vault dashboard</h6>
                <h6>Step 2: Upload files or create folders</h6>
                <h6>Step 3: Share and organize files and folders</h6>

                <h4>What all can I upload?</h4>
                <h6>Documents, Images, Audio, Video, Whatever you want to!</h6>

                <h4>How do I Upload files or make folders</h4>
                <h6>1. At the Bottom right, click on the Icons to upload file or create folder.</h6>
                <h6>2. Choose the file to upload or name the folder to create</h6>

                <h4>How to share folders?</h4>
                <h6>1. Go to Profile</h6>
                <h6>2. Register yourself into your organisation by giving your organisation name</h6>
                <h6>3. Right Click the folder you want to share.</h6>
                <h6>4. Select the members to whom you want to share</h6>
                <h6>5. Click Share</h6>

                <h4>What is the limit for creating folders?</h4>
                <h6>The sky is the limit! We provide infinite nesting</h6>

                <h4>Contact Vault support</h4>
                <h6>Get help with common problems above. If you need help with a different vault problem, contact
                    us.</h6>

                <h4>Submit user feedback</h4>
                <h6>If you've discovered a new bug or technical issue, report the issue right through either the contact
                    us form or at admin@vault.com</h6>
            </div>
        </div>
        <Footer/>
    </div>

}

export default FAQ