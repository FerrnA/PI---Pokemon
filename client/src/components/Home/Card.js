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

    return (
        <div className={c.card}>
            <div className={c.top}>
                <div className={c.type1}>
                    <span>{tiposº1}</span>
                </div>
                <span className={c.id}>#{pad(Id)}</span>
            </div>
            <div className={c.types}>
                {tiposS && tiposS.map(p => <span>{p}</span>)}
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