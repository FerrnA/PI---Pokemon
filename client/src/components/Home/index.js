import React, { useEffect, useState } from 'react';
import { getPokemons } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import SearchBar from './SearchBar';
import Paginado from './Paginado';


export default function Home() {
    const dispatch = useDispatch();
    const pokemones = useSelector((state) => state.pokemons);
    let types = useSelector((state) => state.types);//

    useEffect(()=> {
        dispatch(getPokemons());
    },[dispatch]);

    const [estadoFiltro, setEstadoFiltro] = useState('');
    const [currentPage, setCurrentpage] = useState(1);
    const [pokemonesPorpagina, setPokemonesPorpagina] = useState(12);
    const indiceR = pokemonesPorpagina * currentPage;
    const indiceL = indiceR - pokemonesPorpagina;
    const pokemonsOfPagina = (() => {
        if(estadoFiltro === ''){    
            if(currentPage === 1){
                return pokemones.slice(indiceL, indiceR-3)
            }
            return pokemones.slice(indiceL-3, indiceR-3);
        }
        if(estadoFiltro === 'Pokemones creados'){
            if(currentPage === 1){
                return pokemones.filter(p => p.id >= 1200).slice(indiceL, indiceR-3)
            }
            return pokemones.filter(p => p.id >= 1200).slice(indiceL-3, indiceR-3);
        }
    })();
    function handleChange(e){
        e.preventDefault();
        if(e.target.value === 'Pokemones creados'){
            setEstadoFiltro('Pokemones creados')
        }
    }


    return (
        <div>
          <div>
              <select name='tipos y creados' defaultValue="" onChange={(e) => handleChange(e)}>
                  <option ></option>
                  <select>Tipos de pokemon
                      <option></option>
                  </select>
                  <option value='Pokemones creados'>Pokemones creados</option>
              </select>
              <select>
                  <option></option>
                  <option>Fuerza</option>
                  <option>Alfabeticamente</option>
              </select>
              <button onClick={() => dispatch(getPokemons())}>Get pokemons</button>
          </div>
          <div>
              <SearchBar/>
          </div>
          <div>
            <Paginado
                pokemonesPorpagina={pokemonesPorpagina}
                pokemones={pokemones.length}
                setCurrentPage={setCurrentpage}
            />
            {pokemonsOfPagina && pokemonsOfPagina.map(p => <Card nombre={p.name} imgurl={p.imgurl} tipos={p.tipos}/>)}
          </div>
        </div>
    )
}