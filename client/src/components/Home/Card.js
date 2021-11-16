import React from 'react';

export default function Card({ nombre, imgurl, tipos }){
    return (
        <div>
          <ul>
            <li>Nombre: {nombre}</li>
            {<li>Tipo/s: 
                <ul>
                    {tipos && tipos.map(p => <li>{p}</li>)}
                </ul>
            </li>}
            <img src={imgurl} alt='' />
          </ul>
        </div>
    )
}