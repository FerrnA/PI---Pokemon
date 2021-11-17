import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage';
var Form = require('./components/Form/index.js').default;
var PokemonData = require('./components/PokemonData/PokemonData.js').default;
//var Tipos = require('./components/Tipos/Tipos.js').default;
var Home = require('./components/Home/index.js').default;

function App() {
  return (
    <Router>
      <NavBar path="/home"/>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<Home/>}/>
      {/* <Route path="/types" element={<Tipos/>}/> */}
      <Route path={`/home/pokemons/:pokemonID`} render={({match}) => <PokemonData pokemonid={match.params.pokemonID}/>} />
      <Route path="/home/crea" element={<Form/>}/>
    </Routes>
    </Router>
  );
}

export default App;
