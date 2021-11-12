const router = require('express').Router();
//const { Pokemon, Tipo } = require('../models'); no son los modelos sino las representaciones?
const { Pokemon, Tipo } = require('../db.js');
const axios = require('axios');
const apipkadatos = require('./functions.js');

router.get('/', async function(req,res){
    const namedequery = req.query.name;
    if(namedequery) {
        console.log(namedequery)
        let dbpokemon = await Pokemon.findOne({where: {nombre: namedequery}})
        if(dbpokemon !== null) return res.status(302).send(dbpokemon);
        else {
            await axios({url: `https://pokeapi.co/api/v2/pokemon/${namedequery}`})
                .then(resp => resp.data)
                .then(datos => res.status(302).send(apipkadatos(datos)))
                .catch(err => res.status(404).send({message: 'Pokemon no encontrado'}));
        }
    }

    else {
    let pokemons20 = await axios({url: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'}).then(resp => resp.data);
    let pokemons40 = await axios({url: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20'}).then(resp => resp.data);
    let pokemons = [...pokemons20.results, ...pokemons40.results];
    
    let subrequests = pokemons.map(e => new Promise (function(resolve,reject){ 
            axios({url: e.url})/* 
            .then(resp => resp.data) */
            .then(datos => {
                let pokemonidapi = datos.data;
                const { id, name } = pokemonidapi;
                const imgurl = pokemonidapi.sprites.front_shiny;
                let tipos = [];
                pokemonidapi.types.forEach(e => tipos.push(e.type.name));
                const response = { id, name, imgurl, tipos };
                return response;
            })
            .then(response => resolve(response));
    }));
    let pokemonesSubR = await Promise.all(subrequests);
    res.status(200).send(pokemonesSubR);
    }
});

/* Ruta principal: debe contener
[ ] Input de búsqueda para encontrar pokemons por nombre (La búsqueda será exacta,
    es decir solo encontrará al pokemon si se coloca el nombre completo)
[ ] Área donde se verá el listado de pokemons. Al iniciar deberá cargar los primeros resultados
    obtenidos desde la ruta GET /pokemons y deberá mostrar su:
  Imagen
  Nombre
  Tipos (Electrico, Fuego, Agua, etc)
[ ] Botones/Opciones para filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
[ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético y por fuerza
[ ] Paginado para ir buscando y mostrando los siguientes pokemons, 12 pokemons por pagina,
mostrando los primeros 9 en la primer pagina. */


router.post('/', async function(req,res){
    const { nombre, vida, fuerza, defensa, velocidad, altura, peso, imgurl, tipos } = req.body;
    if(typeof nombre !== 'string') return res.status(403).send({message: 'Nombre requerido'});
    //console.log(nombre);

    const pokemoncreado = await Pokemon.create({
        nombre,
        vida,
        fuerza,
        defensa,
        velocidad,
        altura,
        peso,
        imgurl
    });
    if(tipos) {
        if(tipos.length === 1) {
            const tiposdb = await Tipo.findOne({ where: {name: tipos[0]} });
            //console.log(tiposdb);
            await pokemoncreado.addTipo([tiposdb]);
        }
        else {
          const tiposFind = tipos.map(t => Tipo.findOne({ where: {name: t} }));
          const tiposdb = await Promise.all(tiposFind);
          await pokemoncreado.addTipos(tiposdb);
        }
    }
    res.status(201).send({message: 'Pokemon creado', pokemoncreado}) 
})


router.get('/:idPokemon', async function(req,res){
    if(req.params){
        const { idPokemon } = req.params;
        try {
            let pokemoniddb = await Pokemon.findByPk(idPokemon);
            if(pokemoniddb.length < 1) throw Error;
            res.status(302).send(pokemoniddb);
        }
        catch(err){
            await axios({url: `https://pokeapi.co/api/v2/pokemon/${idPokemon}`})
              .then(resp => resp.data)
              .then(datos => res.status(302).send(apipkadatos(datos)))
              .catch(err => res.status(404).send({message: 'Pokemon no existente'}));
        }
    }
});

/* Ruta de detalle de Pokemon: debe contener

[ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
[ ] Número de Pokemon (id)
[ ] Estadísticas (vida, fuerza, defensa, velocidad)
[ ] Altura y peso */


module.exports = router;