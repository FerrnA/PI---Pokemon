import React, { useEffect, useState, useRef } from 'react';
import { getPokemons, getTypes } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import SearchBar from './SearchBar';
import Paginado from './Paginado';
import { mergeSort } from './mergeFunction';
import spinner from './bulbasaur-gif.gif';
import h from './index.module.css';


export default function Home() {
    const dispatch = useDispatch();
    const pokemones = useSelector((state) => state.pokemons);
    let types = useSelector((state) => state.types);//
    const [estadoTiposselect, setEstadoTiposselect] = useState([])//
    
    const selectSort = useRef(); //asc desc
    const selectTypes = useRef(); // para limpiar los select
    const selectCreated = useRef();

    useEffect(()=> {
        dispatch(getPokemons());
        dispatch(getTypes());
    },[dispatch]);

    const [estadoFiltro, setEstadoFiltro] = useState('');
    const [currentPage, setCurrentpage] = useState(1);
    const pokemonesPorpagina = 12; //const [pokemonesPorpagina, setPokemonesPorpagina] = useState(12);
    const indiceR = pokemonesPorpagina * currentPage;
    const indiceL = indiceR - pokemonesPorpagina;
    const {pokemonsOfPagina, length} = (() => {
        if(estadoFiltro === ''){
            if(currentPage === 1){
                return {pokemonsOfPagina: pokemones.slice(indiceL, indiceR-3), length: pokemones.length}
            }
            return {pokemonsOfPagina: pokemones.slice(indiceL-3, indiceR-3), length: pokemones.length};
        }
        if(estadoFiltro === 'Pokemones creados'){
            if(currentPage === 1){
                let pokemonsOfPagina = pokemones.filter(p => p.id >= 1200);
                return {pokemonsOfPagina: pokemonsOfPagina.slice(indiceL, indiceR-3), length: pokemonsOfPagina.length}
            }
            let pokemonsOfPagina = pokemones.filter(p => p.id >= 1200);
            return {pokemonsOfPagina: pokemonsOfPagina.slice(indiceL-3, indiceR-3), length: pokemonsOfPagina.length}
        }
        if(estadoFiltro === 'Sin pokemones creados'){
            if(currentPage === 1){
                let pokemonsOfPagina = pokemones.filter(p => p.id < 1200);
                return {pokemonsOfPagina: pokemonsOfPagina.slice(indiceL, indiceR-3), length: pokemonsOfPagina.length}
            }
            let pokemonsOfPagina = pokemones.filter(p => p.id < 1200);
            return {pokemonsOfPagina: pokemonsOfPagina.slice(indiceL-3, indiceR-3), length: pokemonsOfPagina.length}
        }
        if(estadoFiltro === 'Filtrado por Tipos'){
            if(currentPage === 1){
                let pokemonsOfPagina = pokemones.filter(p => p.tipos && p.tipos.some(n => estadoTiposselect.includes(n)) === true)
                return {pokemonsOfPagina: pokemonsOfPagina.slice(indiceL, indiceR-3), length: pokemonsOfPagina.length}
            }
            let pokemonsOfPagina = pokemones.filter(p => p.tipos && p.tipos.some(n => estadoTiposselect.includes(n)) === true)
            return {pokemonsOfPagina: pokemonsOfPagina.slice(indiceL-3, indiceR-3), length: pokemonsOfPagina.length}
        }
        if(estadoFiltro === 'Sort by alphabet'){
            let copiapokemones = pokemones.slice();
            let pokemonesSortedA = mergeSort(copiapokemones, 'name');
            if(currentPage === 1){
                let pokemonsOfPagina = pokemonesSortedA.slice(indiceL, indiceR-3)
                return {pokemonsOfPagina, length: pokemones.length}
            }
            let pokemonsOfPagina = pokemonesSortedA.slice(indiceL-3, indiceR-3)
            return {pokemonsOfPagina, length: pokemones.length}
        }
        if(estadoFiltro === 'Sort by alphabet reverse'){
            let copiapokemones = pokemones.slice();
            let pokemonesSortedA = mergeSort(copiapokemones, 'name').reverse();
            if(currentPage === 1){
                let pokemonsOfPagina = pokemonesSortedA.slice(indiceL, indiceR-3)
                return {pokemonsOfPagina, length: pokemonesSortedA.length}
            }
            let pokemonsOfPagina = pokemonesSortedA.slice(indiceL-3, indiceR-3)
            return {pokemonsOfPagina, length: pokemonesSortedA.length}
        }
        if(estadoFiltro === 'Sort by strength'){
            let copiapokemones = pokemones.slice();
            let pokemonesSortedF = mergeSort(copiapokemones, 'fuerza').reverse();
            if(currentPage === 1){
                let pokemonsOfPagina = pokemonesSortedF.slice(indiceL, indiceR-3);
                return {pokemonsOfPagina, length: pokemonesSortedF.length}
            }
            let pokemonsOfPagina = pokemonesSortedF.slice(indiceL-3, indiceR-3);
            return {pokemonsOfPagina, length: pokemonesSortedF.length};
        }
        if(estadoFiltro === 'Sort by strength desc'){
            let copiapokemones = pokemones.slice();
            let pokemonesSortedF = mergeSort(copiapokemones, 'fuerza');
            if(currentPage === 1){
                let pokemonsOfPagina = pokemonesSortedF.slice(indiceL, indiceR-3);
                return {pokemonsOfPagina, length: pokemonesSortedF.length}
            }
            let pokemonsOfPagina = pokemonesSortedF.slice(indiceL-3, indiceR-3);
            return {pokemonsOfPagina, length: pokemonesSortedF.length};
        }
    })();
    function handleChangeSc(e){
        e.preventDefault();
        if(estadoFiltro !== 'Pokemones creados' && estadoFiltro !== 'Sin pokemones creados'){
            selectSort.current.value = "";//---- juntar con setCurrentpage(1) en una funcion ----//
            selectTypes.current.value = ""; ///
            setEstadoTiposselect([]);
            setCurrentpage(1);
        }
        if(e.target.value === 'Pokemones creados'){ 
            setEstadoFiltro('Pokemones creados')
        }
        if(e.target.value === 'Sin pokemones creados'){ 
            setEstadoFiltro('Sin pokemones creados')
        }
    }
    //types
    function handleChangeSt(e) {
        if(e.target.value === '') return
        if(estadoFiltro !== 'Filtrado por Tipos'){
            setEstadoFiltro('Filtrado por Tipos')
            selectSort.current.value = "";///limpiar y focus first page
            selectCreated.current.value = ""; ///
            setCurrentpage(1);
        }
        if(!estadoTiposselect.includes(e.target.value)){
          setEstadoTiposselect([
            ...estadoTiposselect, e.target.value
          ])
        }
    }
    //
    function handleButtonClick(e, t) {
        e.preventDefault();
        if(estadoTiposselect.length === 1 && estadoTiposselect[0] === t) {
          selectTypes.current.value = ""; //limpiar select types input
          setEstadoFiltro('');
        }
        setEstadoTiposselect([
            ...(estadoTiposselect.filter(el => el !== t))
        ]);
        setCurrentpage(1);
    }
    //types

    //sort
    function handleChangeSort(e, target= e.target.value) {
        e.preventDefault();
        if(!estadoFiltro.includes('Sort')){
            selectTypes.current.value = "";///limpiar y focus first page
            selectCreated.current.value = ""; ///
            setEstadoTiposselect([]);
            setCurrentpage(1);
        }
        if(target === 'Sort by alphabet'){
            if(estadoFiltro === 'Sort by alphabet'){
                setEstadoFiltro('Sort by alphabet reverse')
            }
            else if(estadoFiltro === 'Sort by alphabet reverse'){
                setEstadoFiltro('Sort by alphabet')
            }
            else setEstadoFiltro('Sort by alphabet')
        }
        if(target === 'Sort by strength'){
            if(estadoFiltro === 'Sort by strength'){
                setEstadoFiltro('Sort by strength desc')
            }
            else if(estadoFiltro === 'Sort by strength desc'){
                setEstadoFiltro('Sort by strength')
            }
            else setEstadoFiltro('Sort by strength')
        }
    }
    //sort


    return (
        <div className={h.hom}>
            <div name='divSelects' className={h.divSelects}>
                <div> 
                    <label>&emsp;Search by Created&ensp;</label>
                    <select name='selectDecreados' ref={selectCreated} defaultValue="" onChange={(e) => handleChangeSc(e)}>
                        <option ></option>
                        <option value='Pokemones creados'>Pokemones creados</option>
                        <option value='Sin pokemones creados'>Sin pokemones creados</option>
                    </select>
                </div>
                <div>
                    <label>&emsp;Search by Pokemon types&ensp;</label>
                    <select name='selectDetipos' ref={selectTypes} defaultValue="" onChange={(e) => handleChangeSt(e)}>Tipos de pokemon
                            <option></option>
                            {types.length && types.map( t => <option value={t.name}>{t.name}</option>)}
                    </select>
                    <ul className={h.tiposselecc}>
                        {estadoTiposselect.length > 0 && estadoTiposselect.map(t => 
                        <p key={t}>
                        <button type='button' className={h.botonTipos} onClick={(e)=> handleButtonClick(e, t)}></button>{t}</p>
                        )}
                    </ul>
                </div>
                <div>
                    <label>&emsp;Sort by&ensp;</label>
                    <select name="selectDeSort" ref={selectSort} defaultValue="" onChange={(e) => handleChangeSort(e)}>
                        <option></option>
                        <option value='Sort by strength'>Fuerza</option>
                        <option value='Sort by alphabet'>Alfabeticamente</option>
                    </select>
                    <button id="buttonSort" type='button' onClick={(e) => handleChangeSort(e, selectSort.current.value)}>↑↓</button>
                    <button onClick={() => {dispatch(getPokemons()); setEstadoFiltro(''); setCurrentpage(1)}}>Get pokemons</button>
                </div>
                <div>
                    <SearchBar/>
                </div>
            </div>
            <div>
                <div className={h.paginado}>
                    {typeof pokemonsOfPagina === "object" &&
                    <Paginado
                        pokemonesPorpagina={pokemonesPorpagina}
                        pokemones={length}
                        setCurrentPage={setCurrentpage}
                        currentPage={currentPage} />}
                </div>
                <div className={h.cardsContainer}>
                  <div className={h.grid}>
                    {(pokemones.length === 0 && estadoFiltro === '') && <img src={spinner} style={{height: '10em', marginTop:'10em'}} alt=""/>}
                    {pokemones === "Pokemon no encontrado" && <h2>...Pokemon No Encontrado...</h2>}
                    {typeof pokemonsOfPagina === "object" && pokemonsOfPagina.map(p =>
                            <Card nombre={p.name} imgurl={p.imgurl} tipos={p.tipos} Id={p.id}/>)}
                  </div>
                </div>
            </div>
        </div>
    )
}