import React from "react";


export default function Paginado({pokemonesPorpagina, pokemones, setCurrentPage, currentPage}){
    let numberpages = [];
    if(pokemones !== 0){
        for(let i = 0; i < Math.ceil((pokemones+3)/pokemonesPorpagina); i++){
            numberpages.push(i+1)
        }
    }
    return (
        <div>
            
                {numberpages && numberpages.map(n=> (
                    
                        <button type='button' style={currentPage === n ? {fontSize: '12px'} : {fontWeight: '300'}} onClick={()=> setCurrentPage(n)}>{n}</button>
                    
                ))}
            
        </div>
    )
}