import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetail } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";

export default function PokemonDetail() {
  const dispatch = useDispatch();
  const { pokemonID } = useParams();
  const pokemon = useSelector((state) => state.pokemonData);
  useEffect(() => {
    dispatch(getPokemonDetail(pokemonID));
  }, [dispatch, pokemonID]);

  return (
    <div className="pokemonDetail">
      <div className="pokemonDetail--container">
        {pokemon.name && (
          <ul className="pokemonDetail--details">
            <div className="pokemonDetail--details-div">
              <li>ID: {pokemon.id}</li>
              <li>Name: {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</li>
              <li>Altura: {pokemon.altura}</li>
              <li>Peso: {pokemon.peso}</li>
            </div>
            <div className="pokemonDetail--details-div">
              <li>Velocidad: {pokemon.velocidad}</li>
              <li>Vida: {pokemon.vida}</li>
              <li>Fuerza: {pokemon.fuerza}</li>
              <li>Defensa: {pokemon.defensa}</li>
            </div>
            <div className="pokemonDetail--details-div">
              <div style={{ marginTop: "4em" }}>
                <li>
                  Tipo/s:
                  <ul>{pokemon.tipos && pokemon.tipos.map((p) => <li>{p}</li>)}</ul>
                </li>
              </div>
              <img src={pokemon.imgurl} alt="" style={{ width: "100%" }} />
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}
