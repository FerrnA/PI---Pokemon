const express = require('express');
const cookieParser = require('cookie-parser');
/* const bodyParser = require('body-parser'); */
const morgan = require('morgan');

//1 const routes = require('./routes/index.js');
const { pokemons, types, index } = require('./routes/index.js');


require('./db.js');

const server = express();

const clientUrl = process.env.API_CLIENT_URL

server.name = 'API';

server.use(express.urlencoded({ extended: true, limit: '50mb' })); //bodyParser.urlencoded()
server.use(express.json({ limit: '50mb' })); //bodyParser.json()
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${clientUrl}`); // http://localhost:3001?-update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//1 server.use('/', router);
server.use('/', index);
server.use('/pokemons', pokemons);
server.use('/types', types);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
