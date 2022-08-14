const router = require("express").Router();
const { Pokemon, Tipo } = require("../db.js");
const axios = require("axios");
const apipkadatos = require("./functions.js");

// 302 response code is invalid or error for axios

router.get("/", async function (req, res) {
  const namedequery = req.query.name;
  if (namedequery) {
    console.log(namedequery);
    let dbpokemon = await Pokemon.findOne({ where: { name: namedequery } });
    if (dbpokemon !== null) return res.status(200).send(dbpokemon);
    else {
      await axios({ url: `https://pokeapi.co/api/v2/pokemon/${namedequery}` })
        .then((resp) => resp.data)
        .then((datos) => res.status(200).send(apipkadatos(datos)))
        .catch((err) => res.status(404).send({ message: "Pokemon no encontrado" }));
    }
  } else {
    /* let pokemons20 = await axios({url: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'}).then(resp => resp.data);
    let pokemons40 = await axios({url: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20'}).then(resp => resp.data);
    let pokemons = [...pokemons20.results, ...pokemons40.results]; */
    let pokemon20 = new Promise(function (resolve, reject) {
      axios({ url: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20" }).then((resp) =>
        resolve(resp.data)
      );
    });
    let pokemon40 = new Promise(function (resolve, reject) {
      axios({ url: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20" }).then((resp) =>
        resolve(resp.data)
      );
    });
    let pokemons = await Promise.all([pokemon20, pokemon40]);
    pokemons = [...pokemons[0].results, ...pokemons[1].results];

    let subrequests = pokemons.map(
      (e) =>
        new Promise(function (resolve, reject) {
          axios({ url: e.url })
            .then((datos) => {
              let pokemonidapi = datos.data;
              const { id, name } = pokemonidapi;
              const imgurl = pokemonidapi.sprites.other["official-artwork"].front_default;
              const fuerza = pokemonidapi.stats[1].base_stat;
              let tipos = [];
              pokemonidapi.types.forEach((e) => tipos.push(e.type.name));
              const response = { id, name, imgurl, tipos, fuerza };
              return response;
            })
            .then((response) => resolve(response));
        })
    );
    // +pokemones de la base de datos
    let pokemonesSubR = await Promise.all(subrequests);

    let dbpokemons = await Pokemon.findAll({
      include: { model: Tipo, required: false, attributes: ["name"] },
    });
    if (dbpokemons) {
      dbpokemons.forEach((p) => (p.dataValues.tipos = p.dataValues.tipos.map((tn) => tn.name))); //-----x tipos : [{name: 'normal',...},{},{}]----//
      dbpokemons = dbpokemons.map((p) => p.dataValues); //-----x tipos : [{name: 'normal',...},{},{}]----//
      dbpokemons = dbpokemons.map((p) => {
        return { id: p.id, name: p.name, imgurl: p.imgurl, tipos: p.tipos, fuerza: p.fuerza };
      }); //--- Solo lo que necesita el < Home />
      pokemonesSubR = pokemonesSubR.concat(dbpokemons);
    }

    res.status(200).send(pokemonesSubR);
  }
});

var ID = 1200;
router.post("/", async function (req, res) {
  const { name, vida, fuerza, defensa, velocidad, altura, peso, imgurl, tipos } = req.body;
  if (typeof name !== "string") return res.status(403).send({ message: "Nombre requerido" });

  const pokemoncreado = await Pokemon.create({
    id: ID,
    name,
    vida,
    fuerza,
    defensa,
    velocidad,
    altura,
    peso,
    imgurl,
  });
  ID++;
  if (tipos) {
    if (tipos.length === 1) {
      const tiposdb = await Tipo.findOne({ where: { name: tipos[0] } });
      await pokemoncreado.addTipo([tiposdb]);
    } else {
      const tiposFind = tipos.map((t) => Tipo.findOne({ where: { name: t } }));
      const tiposdb = await Promise.all(tiposFind);
      await pokemoncreado.addTipos(tiposdb);
    }
  }
  res.status(201).send({ message: "Pokemon creado", pokemoncreado, tipos });
});

router.get("/:idPokemon", async function (req, res) {
  if (req.params) {
    const { idPokemon } = req.params;
    try {
      let pokemoniddb = await Pokemon.findByPk(idPokemon, {
        include: { model: Tipo, required: false, attributes: ["name"] }, //table types
      });
      if (pokemoniddb.length < 1) throw Error;
      pokemoniddb.dataValues.tipos = pokemoniddb.dataValues.tipos.map((tn) => tn.dataValues.name);
      res.status(200).send(pokemoniddb.dataValues);
    } catch (err) {
      await axios({ url: `https://pokeapi.co/api/v2/pokemon/${idPokemon}` })
        .then((resp) => resp.data)
        .then((datos) => res.status(200).send(apipkadatos(datos)))
        .catch((err) => res.status(404).send({ message: "Pokemon no existente" }));
    }
  }
});

module.exports = router;
