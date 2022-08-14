import React from "react";
import "./styles.css";

function CardStats({ pokeData }) {
  return (
    <div className="cardStats">
      <div className="cardStats--list">
        <li>Altura {pokeData.altura}</li>
        <li>Peso {pokeData.peso}</li>
        <li>Vida {pokeData.vida}</li>
      </div>
      <div className="cardStats--list">
        <li>Velocidad {pokeData.velocidad}</li>
        <li>Fuerza {pokeData.fuerza}</li>
        <li>Defensa {pokeData.defensa}</li>
      </div>
    </div>
  );
}

export default CardStats;
