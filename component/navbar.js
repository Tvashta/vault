import React from "react";
import {Link} from "react-router-dom";


function NavBar(){
    return <nav className="navbar navbar-dark navbar-expand-sm justify-content-between" >
        <Link to="/" className="navbar-brand mb-0 h1">V A U L T</Link>
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link to="/profile" className="nav-link">Profile </Link>
            </li>
            <li className="nav-item">
                <Link to="/fav" className="nav-link">Favourites </Link>
            </li>
        </ul>
    </nav>
}

export default NavBar