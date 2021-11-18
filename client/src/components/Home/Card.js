import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Card({ nombre, imgurl, tipos, Id }){
  

    return (
        <div>
          <ul>
            <li>Name: {nombre}</li>
            <NavLink to={`/home/pokemons/${Id}`}>Details</NavLink>
            {<li>Type/s: 
                <ul>
                    {tipos && tipos.map(p => <li>{p}</li>)}
                </ul>
            </li>}
            <img src={imgurl} alt='' />
          </ul>
        </div>
    )
}