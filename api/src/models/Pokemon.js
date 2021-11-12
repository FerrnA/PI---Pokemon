const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    ID: {
      type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.FLOAT
    },
    fuerza: {
      type: DataTypes.FLOAT
    },
    defensa: {
      type: DataTypes.FLOAT
    },
    velocidad: {
      type: DataTypes.FLOAT
    },
    altura: {
      type: DataTypes.FLOAT
    },
    peso: {
      type: DataTypes.FLOAT
    },
    img: {
      type: DataTypes.STRING
    }
  },
  {
    initialAutoIncrement: 1119,
  }
  );
};
