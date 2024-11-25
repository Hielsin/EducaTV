// modelos/Deportes.js
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion_bd');

const Deportes = sequelize.define('Deportes', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Deportes'
    },
    destacada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});

module.exports = Deportes;
