import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./styles.css";

function Header() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <header className="header">
      <nav className="header--nav">
        <div>
          <h3>
            <NavLink to="/home" className={splitLocation[2] === undefined ? "active" : "nonactive"}>
              Home
            </NavLink>
          </h3>
          <h3>
            <NavLink
              to="/home/crearPokemon"
              className={splitLocation[2] === "crearPokemon" ? "active" : "nonactive"}
            >
              Crear Pokemon
            </NavLink>
          </h3>
        </div>
      </nav>
    </header>
  );
}

export default Header;
