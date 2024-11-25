const { DataTypes } = require('sequelize');
const sequelize = require('../conexion_bd');

const Noticias = sequelize.define('Noticias', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true
    },
    portada: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'publicado'
    },
    video: {  // Nuevo campo para almacenar la ruta del video
            type: DataTypes.STRING,
            allowNull: true,
        },
    
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'noticias'
});

module.exports = Noticias;
