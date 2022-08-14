import React from "react";
import { Route, Routes } from "react-router-dom";
import RoutesNav from "./components/RoutesNav";
import LandingPage from "./pages/LandingPage/LandingPage.js";
import FormCreate from "./pages/FormCreate/index.js";
import PokemonDetail from "./pages/PokemonDetail/index.js";
import Home from "./components/Home/index.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<RoutesNav />}>
        <Route index element={<Home />} />
        <Route path={`pokemons/:pokemonID`} element={<PokemonDetail />} />
        <Route path="crearPokemon" element={<FormCreate />} />
      </Route>
    </Routes>
  );
}

export default App;
