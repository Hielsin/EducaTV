// modelos/EnVivo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion_bd');

const EnVivo = sequelize.define('EnVivo', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'inactivo',  // Puede ser "activo" o "inactivo"
    },
}, {
    tableName: 'en_vivo'
});

module.exports = EnVivo;
