import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getPokemonDetail } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import pd from './index.module.css';

export default function PokemonData(){
    const dispatch = useDispatch();
    const { pokemonID } = useParams();
    const pokemon = useSelector((state) => state.pokemonData)
    useEffect(() => {
        dispatch(getPokemonDetail(pokemonID))
    },[dispatch, pokemonID])
    
    return (
        <div className={pd.pokemondata}>
            <div className={pd.carddatastyle}>
               {pokemon.name &&
                <ul className={pd.divcarddata}>
                    <div className={pd.divdata}> 
                        <li>ID: {pokemon.id}</li> 
                        <li>Name: {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</li>   
                        <li>Altura: {pokemon.altura}</li>
                        <li>Peso: {pokemon.peso}</li>
                    </div>
                    <div className={pd.divdata}>
                        <li>Velocidad: {pokemon.velocidad}</li>
                        <li>Vida: {pokemon.vida}</li>
                        <li>Fuerza: {pokemon.fuerza}</li>
                        <li>Defensa: {pokemon.defensa}</li>
                    </div>
                    <div className={pd.divdata}>
                        <div style={{marginTop: '4em'}}>
                            <li>Tipo/s: 
                                <ul>
                                    {pokemon.tipos && pokemon.tipos.map(p => <li>{p}</li>)}
                                </ul>
                            </li>
                        </div>
                        <img src={pokemon.imgurl} alt='' style={{width: '100%'}}/>
                    </div>
                </ul>
                }
            </div>
        </div>
    )
}