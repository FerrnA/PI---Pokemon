import React from 'react';
import { NavLink } from 'react-router-dom';
import c from './Card.module.css';


export default function Card({ nombre, imgurl, tipos, Id, ataque }){
  
    function pad(num) { //function for Id leading zeros #005
        num = num.toString();
        while (num.length < 3) num = "0" + num;
        return num;
    }
    const tiposº1 = tipos[0];
    const tiposS = tipos.slice(1);

    function switchTypeStyle (p) {
        switch(p){
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
            return c.grey
        }
    }
    return (
        <div className={c.card}>
            <div className={c.top}>
                <div className={c.type1}>
                    <span className={switchTypeStyle(tiposº1)}>{tiposº1}</span>
                </div>
                <span className={c.id}>#{pad(Id)}</span>
            </div>
            <div className={c.types}>
                {tiposS && tiposS.map(p => <span className={switchTypeStyle(p)}>{p}</span>)}
            </div>
            <div className={c.divpoke}>
                <img src={imgurl} alt='' className={c.imgpoke} />
                <h3>{nombre[0].toUpperCase() + nombre.slice(1)}</h3>
            </div>
            {/* <p>Ataque: {ataque}</p>
            <NavLink to={`/home/pokemons/${Id}`} className={c.details} >Details</NavLink> */}
        </div>
    )
}