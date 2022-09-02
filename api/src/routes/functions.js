function apipkadatos(pokemonidapi) {
  const { id, name, height: altura, weight: peso } = pokemonidapi;

  let stats = [];
  pokemonidapi.stats.forEach((e) => stats.push(e.base_stat));
  const [vida, fuerza, defensa, , , velocidad] = [...stats];
  const imgurl = pokemonidapi.sprites.other["official-artwork"].front_default;

  let tipos = [];
  pokemonidapi.types.forEach((e) => tipos.push(e.type.name));

  const response = { id, name, altura, peso, vida, fuerza, defensa, velocidad, imgurl, tipos };
  return response;
}

module.exports = apipkadatos;
