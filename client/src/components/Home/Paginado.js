import React from "react";


export default function Paginado({pokemonesPorpagina, pokemones, setCurrentPage}){
    let numberpages = [];
    for(let i = 0; i < Math.ceil(pokemones/pokemonesPorpagina); i++){
        numberpages.push(i+1)
    }

    return (
        <div>
            
                {numberpages && numberpages.map(n=> (
                    
                        <button type='button' onClick={()=> setCurrentPage(n)}>{n}</button>
                    
                ))}
            
        </div>
    )
}