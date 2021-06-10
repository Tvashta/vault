import React from "react";
import {Link} from "react-router-dom";


function NavBar() {
    return <nav className="navbar navbar-dark navbar-expand-sm justify-content-between">
        <Link to="/" className="navbar-brand mb-0 h1">V A U L T</Link>
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link to="/search" className="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                         className="bi bi-search" viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/profile" className="nav-link">Profile </Link>
            </li>
            <li className="nav-item">
                <Link to="/fav" className="nav-link">Favourites </Link>
            </li>
            <li className="nav-item">
                <Link to="/shared" className="nav-link">Shared with Me</Link>
            </li>
            <li className="nav-item">
                <Link to="/announce" className="nav-link">Announce </Link>
            </li>
        </ul>
    </nav>
}

export default NavBar