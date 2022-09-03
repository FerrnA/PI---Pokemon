import axios from "axios";

export const getPokemons = function () {
  return async function (dispatch) {
    return await axios(`pokemons`).then((json) =>
      dispatch({ type: "ADD_POKEMONS", payload: json.data })
    );
  };
};

export const createPokemon = function (form) {
  return async function (dispatch) {
    return await axios
      .post(`pokemons`, { ...form })
      .then((json) => dispatch({ type: "ADD_POKEMONCREADO", payload: json.data }));
  };
};

export const getPokemonDetail = function (idpokemon) {
  return async function (dispatch) {
    return await axios(`pokemons/${idpokemon}`).then((json) =>
      dispatch({ type: "POKEMON_DETAILS", payload: json.data })
    );
  };
};

export const getTypes = function () {
  return async function (dispatch) {
    return await axios(`types`).then((resp) => dispatch({ type: "ADD_TYPES", payload: resp.data }));
  };
};

export const cleanTypes = function () {
  return { type: "CLEAN_TYPES" };
};

export const getPokemonName = function (queryname) {
  return async function (dispatch) {
    return await axios
      .get(`pokemons?name=${queryname}`)
      .then((json) => dispatch({ type: "POKEMON_ENCONTRADO", payload: json.data }))
      .catch((error) => dispatch({ type: "POKEMON_NO_ENCONTRADO", payload: error }));
  };
};
