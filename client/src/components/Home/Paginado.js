import React from "react";


export default function Paginado({pokemonesPorpagina, pokemones, setCurrentPage}){
    let numberpages = [];
    if(pokemones !== 0){
        for(let i = 0; i < Math.ceil((pokemones+3)/pokemonesPorpagina); i++){
            numberpages.push(i+1)
        }
    }
    return (
        <div>
            
                {numberpages && numberpages.map(n=> (
                    
                        <button type='button' onClick={()=> setCurrentPage(n)}>{n}</button>
                    
                ))}
            
        </div>
    )
}