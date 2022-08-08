import React from "react";
import { NavLink } from "react-router-dom";
import c from "./Card.module.css";
import "./Cards.css";

export default function Card({ nombre, imgurl, tipos, Id, ataque }) {
  const name = nombre[0].toUpperCase() + nombre.slice(1);

  function pad(num) {
    //function for Id leading zeros #005
    num = num.toString();
    while (num.length < 3) num = "0" + num;
    return num;
  }

  function switchTypeStyle(p) {
    switch (p) {
      case "normal":
        return c.normal;
      case "fighting":
        return c.fighting;
      case "flying":
        return c.flying;
      case "poison":
        return c.poison;
      case "ground":
        return c.ground;
      case "rock":
        return c.rock;
      case "bug":
        return c.bug;
      case "ghost":
        return c.ghost;
      case "steel":
        return c.steel;
      case "fire":
        return c.fire;
      case "water":
        return c.water;
      case "grass":
        return c.grass;
      case "electric":
        return c.electric;
      case "psychic":
        return c.psychic;
      case "ice":
        return c.ice;
      case "dragon":
        return c.dragon;
      case "dark":
        return c.dark;
      case "fairy":
        return c.fairy;
      case "unknown":
        return c.unknown;
      case "shadow":
        return c.shadow;
      default:
        return c.grey;
    }
  }
  function switchBgStyle(p) {
    switch (p) {
      case "normal":
        return c.bGnormal;
      case "fighting":
        return c.bGfighting;
      case "flying":
        return c.bGflying;
      case "poison":
        return c.bGpoison;
      case "ground":
        return c.bGground;
      case "rock":
        return c.bGrock;
      case "bug":
        return c.bGbug;
      case "ghost":
        return c.bGghost;
      case "steel":
        return c.bGsteel;
      case "fire":
        return c.bGfire;
      case "water":
        return c.bGwater;
      case "grass":
        return c.bGgrass;
      case "electric":
        return c.bGelectric;
      case "psychic":
        return c.bGpsychic;
      case "ice":
        return c.bGice;
      case "dragon":
        return c.bGdragon;
      case "dark":
        return c.bGdark;
      case "fairy":
        return c.bGfairy;
      case "unknown":
        return c.bGunknown;
      case "shadow":
        return c.bGshadow;
      default:
        return c.bGgrey;
    }
  }
  return (
    <div className={"card " + switchBgStyle(tipos[0])}>
      <div className="card_typesAndId">
        <div className="card_typesAndId--types">
          {tipos && tipos.map((p) => <span className={switchTypeStyle(p) + " type"}>{p}</span>)}
        </div>
        <span className="">#{pad(Id)}</span>
      </div>
      <div className="card_Center">
        <img src={imgurl} alt={name} className="card_Center--img" width="150" />
        <h2 className="card_Center--pokeName">{name}</h2>
        <NavLink to={`/home/pokemons/${Id}`} className="card_Center--details">
          <span>^</span>
          <br />
          Ver detalles
        </NavLink>
      </div>
    </div>
  );
}

/* <div className={c.card}>
      <div className={c.top}>
        <div className={c.type1}>
          <i className={switchTypeStyle(tiposº1)}>{tiposº1}</i>
        </div>
        <span className={c.id}>#{pad(Id)}</span>
      </div>
      <div className={c.types}>
        {tiposS &&
          tiposS.map((p) => <i className={switchTypeStyle(p)}>{p}</i>)}
      </div>
      <div className={c.divpoke}>
        <img src={imgurl} alt="" className={c.imgpoke} />
        <h3>{nombre[0].toUpperCase() + nombre.slice(1)}</h3>
      </div>
      <NavLink to={`/home/pokemons/${Id}`} className={c.details}>
        Details
      </NavLink>
    </div> */
