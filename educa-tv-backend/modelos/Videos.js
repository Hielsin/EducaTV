// modelos/Videos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion_bd');

const Videos = sequelize.define('Videos', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    video: { // Campo para almacenar la ruta del archivo de video
        type: DataTypes.STRING,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Videos;
