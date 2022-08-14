import React from "react";
import { Route, Routes } from "react-router-dom";
import RoutesNav from "./components/RoutesNav";
import LandingPage from "./components/LandingPage/LandingPage.js";
import Form from "./components/Form/index.js";
import PokemonDetail from "./components/PokemonDetail/index.js";
import Home from "./components/Home/index.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<RoutesNav />}>
        <Route index element={<Home />} />
        <Route path={`pokemons/:pokemonID`} element={<PokemonDetail />} />
        <Route path="crea" element={<Form />} />
      </Route>
    </Routes>
  );
}

export default App;
