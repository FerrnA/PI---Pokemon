import React from 'react';
import { NavLink } from 'react-router-dom';
import c from './Card.module.css';


export default function Card({ nombre, imgurl, tipos, Id }){
  

    return (
        <div className={c.cardstyle}>
            <h3>{nombre[0].toUpperCase() + nombre.slice(1)}</h3>
            <NavLink to={`/home/pokemons/${Id}`} className={c.details}>Details</NavLink>
            {<p className={c.typespokemon}>Type/s: 
                <ul >
                    {tipos && tipos.map(p => <li>{p}</li>)}
                </ul>
            </p>}
            <img src={imgurl} alt='' style={{heigth: '2em'}}/>
        </div>
    )
}