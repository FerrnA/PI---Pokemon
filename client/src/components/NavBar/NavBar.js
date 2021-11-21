import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import a from './NavBar.module.css'

export default function NavBar() {
    const location = useLocation(); //assigning location variable
    const { pathname } = location; //destructuring pathname from location
    const splitLocation = pathname.split("/");

    return (
        <div className={a.asd}>
        <header className={a.header}>
            <nav className={a.nav}>
                    <div className={a.navlinks}>
                        <h3><NavLink to="/home" className={splitLocation[2] === undefined ? a.active : a.nonactive}>Home</NavLink></h3>
                        <h3><NavLink to="/home/types" className={splitLocation[2] === "types" ? a.active : a.nonactive}>Pokemon types</NavLink></h3>
                        <h3><NavLink to="/home/crea" className={splitLocation[2] === "crea" ? a.active : a.nonactive}>Create!</NavLink></h3>
                    </div>
            </nav>
        </header>
        <div className={a.component}>
            <Outlet></Outlet>
        </div>
        </div>
    )
}