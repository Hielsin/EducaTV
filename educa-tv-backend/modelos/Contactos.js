// modelos/Contactos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion_bd');

const Contactos = sequelize.define('Contactos', {
    direccion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true, // Validación para asegurarse de que el email sea válido
        },
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    twitter: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    youtube: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'contactos',
    timestamps: true, // Añade campos createdAt y updatedAt automáticamente
});

module.exports = Contactos;
