const { Sequelize } = require('sequelize');
require('dotenv').config();  // Cargar dotenv

// Configuración de Sequelize utilizando las variables de entorno
const sequelize = new Sequelize(
    process.env.DB_DATABASE,        // Nombre de la base de datos
    process.env.DB_USERNAME,        // Usuario de la base de datos
    process.env.DB_PASSWORD,        // Contraseña
    {
        host: process.env.DB_HOST,  // Dirección del host
        port: process.env.DB_PORT,  // Puerto de MySQL
        dialect: 'mysql',           // Dialecto especificado explícitamente
    }
);

module.exports = sequelize;
