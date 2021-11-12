const router = require('express').Router();

//const { Pokemon } = require('../models/Pokemon.js');
//const { Tipo } = require('../models/Tipo.js');

router.get('/', function(req,res){

})

module.exports = {
    pokemons: require('./pokemons.js'),
    types: require('./types.js'),
    index: router
}