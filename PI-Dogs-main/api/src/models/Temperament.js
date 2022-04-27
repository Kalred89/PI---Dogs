const { DataTypes } = require('sequelize');

// -- MODEL FOR DOG MOODS --
module.exports = sequelize =>{
    sequelize.define('temperament', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER,
        },

        name: {
            type: DataTypes.STRING,
        }
    }, {
        timestamps: false
    });
}

// [ ] Temperamento con las siguientes propiedades:
// ID
// Nombre