const router = require('express').Router();
//const { Pokemon, Tipo } = require('../models'); no son los modelos sino como van a ser   representados
const { Pokemon, Tipo } = require('../db.js');

router.get('/', async function(req,res){
    let tiposdb = await Tipo.findAll();
    res.status(200).send(tiposdb);
});

module.exports = router;