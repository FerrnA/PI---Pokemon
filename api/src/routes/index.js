const router = require("express").Router();
const path = require("path");

//const { Pokemon } = require('../models/Pokemon.js');
//const { Tipo } = require('../models/Tipo.js');

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

module.exports = {
  pokemons: require("./pokemons.js"),
  types: require("./types.js"),
  index: router,
};
