import React, { Suspense, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { pad, switchBgStyle, switchTypeStyle } from "./functions";
import PokeStats from "./PokeStats/PokeStats";
import axios from "axios";
import "./Cards.css";

const apiUrl = process.env.REACT_APP_API;

export default function Card({ nombre, imgurl, tipos, Id, ataque }) {
  // for uppercase name "Pokemon"
  const name = nombre[0].toUpperCase() + nombre.slice(1);

  const [pokeData, setPokeData] = useState();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      axios(`${apiUrl}/pokemons/${Id}`).then((res) => setPokeData({ ...res.data }));
    }
    return () => {
      mounted = false;
    };
  }, [Id]);

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
        <Suspense fallback={<></>}>{pokeData && <PokeStats pokeData={pokeData} />}</Suspense>
        <NavLink to={`/home/pokemons/${Id}`} className="card_Center--details">
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
