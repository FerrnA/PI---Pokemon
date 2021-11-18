import React, { useEffect, useState } from 'react';
import { getPokemons, getTypes } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import SearchBar from './SearchBar';
import Paginado from './Paginado';
import { mergeSort, merge } from './mergeFunction';


export default function Home() {
    const dispatch = useDispatch();
    const pokemones = useSelector((state) => state.pokemons);
    let types = useSelector((state) => state.types);//
    const [estadoTiposselect, setEstadoTiposselect] = useState([])//

    useEffect(()=> {
        dispatch(getPokemons());
        dispatch(getTypes());
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
        if(estadoFiltro === 'Filtrado por Tipos'){
            if(currentPage === 1){
                return pokemones.filter(p => p.tipos && p.tipos.some(n => estadoTiposselect.includes(n)) === true).slice(indiceL, indiceR-3)
            }
            return pokemones.filter(p => p.tipos && p.tipos.some(n => estadoTiposselect.includes(n)) === true).slice(indiceL-3, indiceR-3);
        }
        if(estadoFiltro === 'Sort by alphabet'){
            let copiapokemones = pokemones.slice();
            let pokemonesSortedA = mergeSort(copiapokemones, 'name');
            if(currentPage === 1){
                return pokemonesSortedA.slice(indiceL, indiceR-3)
            }
            return pokemonesSortedA.slice(indiceL-3, indiceR-3);
        }
        if(estadoFiltro === 'Sort by strength'){
            let copiapokemones = pokemones.slice();
            let pokemonesSortedF = mergeSort(copiapokemones, 'fuerza');
            if(currentPage === 1){
                return pokemonesSortedF.slice(indiceL, indiceR-3)
            }
            return pokemonesSortedF.slice(indiceL-3, indiceR-3);
        }
    })();
    function handleChange(e){
        e.preventDefault();
        if(e.target.value === 'Pokemones creados'){
            setEstadoFiltro('Pokemones creados')
        }
    }
    //types
    function handleChange2(e) {
        setEstadoFiltro('Filtrado por Tipos')
        if(!estadoTiposselect.includes(e.target.value)){
          setEstadoTiposselect([
            ...estadoTiposselect, e.target.value
          ])
        }
    }
    //
    function handleButtonClick(e, t) {
        e.preventDefault();
        setEstadoTiposselect([
            ...(estadoTiposselect.filter(el => el !== t))
        ]);
    }
    //types

    //sort
    function handleChangeSort(e) {
        e.preventDefault();
        if(e.target.value === 'Sort by alphabet'){
            setEstadoFiltro('Sort by alphabet')
        }
        if(e.target.value === 'Sort by strength'){
            setEstadoFiltro('Sort by strength')
        }
    }
    //sort

    return (
        <div>
          <div>
              <select name='tipos y creados' defaultValue="" onChange={(e) => handleChange(e)}>
                  <option ></option>
                  <option value='Pokemones creados'>Pokemones creados</option>
              </select>
              <div>
                  <select name='tipos' defaultValue="" onChange={(e) => handleChange2(e)}>Tipos de pokemon
                    <option></option>
                    { types.length && types.map( t => <option value={t.name}>{t.name}</option>) }
                  </select>
                  <ul>
                    { estadoTiposselect.length > 0 && estadoTiposselect.map(t => 
                    <div>  
                        <li key={t}>{t}</li>
                        <button type='button' onClick={(e)=> handleButtonClick(e, t)}>0</button>
                    </div>) }
                  </ul>
              </div>
              <select name='sort' defaultValue="" onChange={(e) => handleChangeSort(e)}>
                  <option></option>
                  <option value='Sort by strength'>Fuerza</option>
                  <option value='Sort by alphabet'>Alfabeticamente</option>
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