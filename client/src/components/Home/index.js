import React, { useEffect } from 'react';
import { getPokemons } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import SearchBar from './SearchBar';

export default function Home() {
    const dispatch = useDispatch(); 
    const pokemones = useSelector((state) => state.pokemons);
    useEffect(()=> {
        dispatch(getPokemons());
    },[dispatch]);
    return (
        <div>
          <div>
              <select>
                  <option></option>
                  <option>Tipos de pokemon</option>
                  <option>Pokemones creados</option>
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
            {pokemones && pokemones.map(p => <Card nombre={p.name} imgurl={p.imgurl} tipos={p.tipos}/>)}
          </div>
        </div>
    )
}

/* function mapStateToProps(state) {
    return {
      pokemones: state.pokemons
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getPokemons: () => dispatch(getPokemons())
    };
  }
  
export default connect( mapStateToProps, mapDispatchToProps)(Home); */
