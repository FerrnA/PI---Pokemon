import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage.js";
import Form from "./components/Form/index.js";
import PokemonData from "./components/PokemonData/index.js";
import Home from "./components/Home/index.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path={`pokemons/:pokemonID`} element={<PokemonData />} />
        <Route path="crea" element={<Form />} />
      </Route>
    </Routes>
  );
}

export default App;
