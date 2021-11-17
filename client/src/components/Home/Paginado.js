import React from "react";


export default function Paginado({pokemonesPorpagina, pokemones, setCurrentPage}){
    let numberpages = [];
    for(let i = 0; i < Math.ceil(pokemones/pokemonesPorpagina); i++){
        numberpages.push(i+1)
    }

    return (
        <div>
            <ul>
                {numberpages && numberpages.map(n=> (
                    <li>
                        <a onClick={()=> setCurrentPage(n)}>{n}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}