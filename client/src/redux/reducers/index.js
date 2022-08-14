
const initialState = {
    types: [],
    pokemons: [],
    pokemonscreados: [],
    pokemonData: [],
    message: ""
}

const rootReducer = function(state=initialState, action) {
    switch(action.type) {
        case 'ADD_POKEMONCREADO':
            return {...state, pokemonscreados: [...state.pokemonscreados,{...action.payload.pokemoncreado, tipos: action.payload.tipos}]}
        case 'POKEMON_DETAILS':
            return {...state, pokemonData: action.payload}
        case 'ADD_POKEMONS':
            return {...state, pokemons: [...action.payload]}
        case 'ADD_TYPES':
            return {...state, types: [...action.payload]}  
        case "POKEMON_ENCONTRADO":
            console.log(action.payload)
            return {...state, pokemons: [action.payload]}
        case 'POKEMON_NO_ENCONTRADO':
            console.log(action.payload)
            return {...state, pokemons: "Pokemon no encontrado"}
        default:
            return state;
    }
}

export default rootReducer;