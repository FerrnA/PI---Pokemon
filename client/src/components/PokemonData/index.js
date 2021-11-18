import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getPokemonDetail } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';

export default function PokemonData(){
    const dispatch = useDispatch();
    const { pokemonID } = useParams();
    const pokemon = useSelector((state) => state.pokemonData)
    useEffect(() => {
        dispatch(getPokemonDetail(pokemonID))
    },[dispatch, pokemonID])
    
    return (
        <div>
           {pokemon &&
            <ul>  
                <li>ID: {pokemon.id}</li> 
                <li>Name: {pokemon.name}</li>   
                <li>Altura: {pokemon.altura}</li>
                <li>Peso: {pokemon.peso}</li>
                <li>Velocidad: {pokemon.velocidad}</li>
                <li>Vida: {pokemon.vida}</li>
                <li>Fuerza: {pokemon.fuerza}</li>
                <li>Defensa: {pokemon.defensa}</li>
                <li>Tipo/s: 
                    <ul>
                        {pokemon.tipos && pokemon.tipos.map(p => <li>{p}</li>)}
                    </ul>
                </li>
                <img src={pokemon.imgurl} alt='' />
            </ul>
            }
        </div>
    )
}