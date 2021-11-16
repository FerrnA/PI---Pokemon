import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.css';

export default function NavBar() {
    return (
        <header className="navbar">
            <div>
                {/* <img src={} alt="" /> */}
            </div>
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink to="/home" >Home</NavLink>
                        <NavLink to="/home/types" >Pokemon types</NavLink>
                        <NavLink to="/home/crea" >Crea</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}