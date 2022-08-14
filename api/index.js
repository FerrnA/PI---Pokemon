//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Tipo } = require('./src/db.js');
const axios = require('axios');

// Syncing all the models at once.
conn.sync({ force: true }).then( async () => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
  /**/
  let estantipos = await Tipo.findAll();
  if(estantipos.length === 0){
    let tipostraidosapi = await axios({url: 'https://pokeapi.co/api/v2/type'})
        .then(response => response.data)
        .then(resp => resp.results);
    let creadores = tipostraidosapi.map(data => Tipo.create({name: data.name}));
    await Promise.all(creadores);
    console.log("Tipos precargados");
  }
});
