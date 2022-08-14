import React from "react";
import { NavLink } from "react-router-dom";
import pokeapi from "../../images/pokeapi.png";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <span>
        Bienvenido/a a <br />
        <img src={pokeapi} alt="pokeapi logo" />
      </span>
      <NavLink to="/home">
        <div className="landing--pokeball"></div>
      </NavLink>
    </div>
  );
}
