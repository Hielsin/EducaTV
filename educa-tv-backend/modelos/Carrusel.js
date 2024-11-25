const { DataTypes } = require('sequelize');
const sequelize = require('../conexion_bd'); // Asegúrate de que `conexion_bd` está configurado correctamente.

const Carrusel = sequelize.define('Carrusel', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: true, // Opcional, por si quieres mostrar un título para la imagen
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true, // Opcional, por si quieres agregar más detalles
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false, // Ruta de la imagen (obligatoria)
    }
}, {
    timestamps: true, // Para que registre `createdAt` y `updatedAt`
});

module.exports = Carrusel;
