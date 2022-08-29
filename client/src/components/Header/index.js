import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import logo from "../../images/pokeapi.png";
import "./styles.css";

function Header() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <header className="header">
      <nav className="header--nav">
        <NavLink to="/home">
          <img src={logo} alt="pokeapi_logo" height={50} />
        </NavLink>
        <div className="header--nav_links">
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
        <div>
          <SearchBar />
        </div>
      </nav>
    </header>
  );
}

export default Header;
