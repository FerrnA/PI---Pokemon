import React, { Suspense, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { pad, switchBgStyle, switchTypeStyle } from "./functions";
import CardStats from "./CardStats";
import axios from "axios";
import "./styles.css";

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
      <div className="card--typesAndId">
        <div className="card--typesAndId_types">
          {tipos && tipos.map((p) => <span className={switchTypeStyle(p) + " type"}>{p}</span>)}
        </div>
        <span className="">#{pad(Id)}</span>
      </div>
      <div className="card--Center">
        <img src={imgurl} alt={name} className="card--Center_img" width="150" />
        <h2 className="card--Center_pokeName">{name}</h2>

        {/* TODO: agregar un componente loader como fallback del componente  CardStats */}
        <Suspense fallback={<></>}>{pokeData && <CardStats pokeData={pokeData} />}</Suspense>

        <NavLink to={`/home/pokemons/${Id}`} className="card--Center_details">
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
