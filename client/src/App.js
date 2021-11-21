import React from 'react';
//import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage';
var Form = require('./components/Form/index.js').default;
var PokemonData = require('./components/PokemonData/index.js').default;
var Tipos = require('./components/Tipos/Tipos.js').default;
var Home = require('./components/Home/index.js').default;

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<NavBar/>}>
        <Route path="" element={<Home/>}/>
        <Route path="types" element={<Tipos/>}/>
        <Route path={`/home/pokemons/:pokemonID`} element={<PokemonData/>} />
        <Route path="crea" element={<Form/>}/>
      </Route>
    </Routes>
    </Router>
  );
}

export default App;


/* <Router>
      <NavBar path="/home"/>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/home/types" element={<Tipos/>}/>
      <Route path={`/home/pokemons/:pokemonID`} element={<PokemonData/>} />
      <Route path="/home/crea" element={<Form/>}/>
    </Routes>
    </Router> */