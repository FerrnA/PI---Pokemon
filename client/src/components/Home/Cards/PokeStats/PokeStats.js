import React from "react";
import "./PokeStats.css";

function PokeStats({ pokeData }) {
  return (
    <div className="pokeStats">
      <div className="pokeStats--list">
        <li>Altura {pokeData.altura}</li>
        <li>Peso {pokeData.peso}</li>
        <li>Vida {pokeData.vida}</li>
      </div>
      <div className="pokeStats--list">
        <li>Velocidad {pokeData.velocidad}</li>
        <li>Fuerza {pokeData.fuerza}</li>
        <li>Defensa {pokeData.defensa}</li>
      </div>
    </div>
  );
}

export default PokeStats;
