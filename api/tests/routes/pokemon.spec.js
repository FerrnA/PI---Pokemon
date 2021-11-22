/* eslint-disable import/no-extraneous-dependencies */
const expect = require('chai').expect;
const session = require('supertest-session');
const app = require('../../src/app.js');
const {Pokemon, conn} = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};
const pokemonpost = {
  name: 'qpks',
  fuerza: '46',
  defensa: '46',
  vida: '56',
  velocidad: '46',
  altura: '56',
  peso: '46',
  tipos: [],
  imgurl: ''
}

describe("something", function () {
  this.timeout(5000); 

  // tests...
  describe('Pokemon routes', () => {
    before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
    beforeEach(() => Pokemon.sync({ force: true })
      .then(() => Pokemon.create(pokemon)));
    
    describe('GET /pokemons', () => {
      it('should get 200', () =>
        agent.get('/pokemons').expect(200)
      );
    });
    
    describe('GET /pokemons?name', () => {
      it('should get 200', () =>
        agent.get('/pokemons?name=pikachu').expect(200)
      );
      it('should return pokemon data', () =>
        agent.get('/pokemons?name=pikachu').then(res => expect(res.body.name).to.equal('pikachu'))
      );
      it('should return a message if pokemon doesnt get finded', () =>
        agent.get('/pokemons?name=pika').then(res => expect(res.body.message).to.equal('Pokemon no encontrado'))
      );
    });

    describe('GET /types', () => {
      it('should get 200', () =>
        agent.get('/types').expect(200)
      );
    });

    describe('GET /:idPokemon', () => {
      it('should get 200', () =>
        agent.get('/pokemons/25').expect(200)
      );
      it('should return object with pokemon data', ()=>
        agent.get('/pokemons/25').then(data => data.name)
      )
    });

    describe('POST /pokemons', () => {
      it('should get 200', () =>
        agent.post('/pokemons')
          .send(pokemonpost)
          .then((res) => expect(res.body.message).to.equal('Pokemon creado'))
      );
      it('should return a message if the name its not specified', () =>
        agent.post('/pokemons')
          .send({vida: '50'})
          .then((res) => expect(res.body.message).to.equal('Nombre requerido'))
      );
    });
  });
});
