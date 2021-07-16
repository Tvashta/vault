import React from "react";
import {Link} from "react-router-dom";

function Footer() {
    return <div className="footer">
        <nav className="navbar navbar-dark navbar-expand-sm">
            <ul className="navbar-nav mx-auto order-0">
                <li className="nav-item">
                    <Link to="/contact" className="nav-link">Contact us</Link>
                </li>
                <li className="nav-item">
                    <a href="https://github.com/Tvashta/vault" target="_blank" rel="noreferrer noopener" className="nav-link">Made with ✨</a>
                </li>
                <li className="nav-item">
                    <Link to="/faq" className="nav-link">FAQ</Link>
                </li>
                <li className="chat">
                    <Link to="/chat" className="nav-link">Chat</Link>
                </li>
            </ul>
        </nav>
    </div>

}

export default Footer