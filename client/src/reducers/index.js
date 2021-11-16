
const initialState = {
    types: [],
    pokemons: [],
    pokemonscreados: [],
    pokemonData: []
}

const rootReducer = function(state=initialState, action) {
    switch(action.type) {
        case 'ADD_POKEMONCREADO':
            return {...state, pokemonscreados: [...state.pokemonscreados, action.payload.pokemoncreado]}
        case 'POKEMON_DETAILS':
            return {...state, pokemonData: [...action.payload]}
        case 'ADD_POKEMONS':
            return {...state, pokemons: [...action.payload]}
        case 'ADD_TYPES':
            return {...state, types: [...action.payload]}
        case 'REMOVE_TYPES':
            return {...state, types: []}      
        case "POKEMON_ENCONTRADO":
            console.log(action.payload)
            return {...state, pokemons: [action.payload]}
        case 'POKEMON_NO_ENCONTRADO':
            console.log(action.payload)
            return state
        default:
            return state;
    }
}

export default rootReducer;