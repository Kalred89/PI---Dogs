const { DataTypes, UUIDV4 } = require('sequelize');
const Temperament = require('./Temperament');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    height: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    weight: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    life_span: {
        type: DataTypes.STRING,
    }, 

    image: {
      type: DataTypes.STRING,
    }, 

  },{});
}

// [ ] Raza con las siguientes propiedades:
// ID *
// Nombre *
// Altura *
// Peso *
// Años de vida