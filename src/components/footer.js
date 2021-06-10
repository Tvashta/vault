import React from "react";
import {Link} from "react-router-dom";

function Footer(){
    return <div className="footer">
        <nav className="navbar navbar-dark navbar-expand-sm" >
            <ul className="navbar-nav mx-auto order-0">
                <li className="nav-item">
                    <Link to="/contact" className="nav-link">Contact us</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">Made with ✨</Link>
                </li>
                <li className="nav-item">
                    <Link to="/faq" className="nav-link">FAQ</Link>
                </li>

            </ul>
        </nav>
    </div>

}

export default Footer