import React from "react";
import spinner from "../../images/bulbasaur-gif.gif";
import Card from "./ItemCard";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

function Cards({ pokemones, pokemonsPaginated, filterStatus }) {
  return (
    <div className="cards">
      {pokemones.length === 0 ? (
        filterStatus === "" && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <img src={spinner} style={{ height: "10em" }} alt="spinner-bulbasaur" />
          </div>
        )
      ) : (
        <div className="cards--grid">
          {pokemones === "Pokemon no encontrado" && <h2>...Pokemon No Encontrado...</h2>}
          {typeof pokemonsPaginated === "object" &&
            pokemonsPaginated.map((p, i) => (
              <Card key={uuidv4()} nombre={p.name} imgurl={p.imgurl} tipos={p.tipos} Id={p.id} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Cards;
