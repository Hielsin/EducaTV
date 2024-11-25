// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('educa_tv_bd', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
});

module.exports = sequelize;
