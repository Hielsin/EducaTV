const { DataTypes } = require('sequelize');
const sequelize = require('../conexion_bd'); // Asegúrate de que esta sea tu configuración de conexión

const Articulo = sequelize.define('Articulos', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Articulo;
