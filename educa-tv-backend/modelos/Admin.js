const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../conexion_bd'); // Importa tu conexión Sequelize
const bcrypt = require('bcrypt');

// Define el modelo de Admin
const Admin = sequelize.define('Admin', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'admin_users', // Especifica el nombre de la tabla
  timestamps: false, // Si no usas createdAt y updatedAt, desactívalos
});

// Buscar administrador por correo electrónico
Admin.findByEmail = async (email) => {
  return await Admin.findOne({ where: { email } }); // Utiliza el método findOne de Sequelize
};

// Crear un nuevo administrador
Admin.createAdmin = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Cifrar la contraseña
  return await Admin.create({ email, password: hashedPassword }); // Crear nuevo registro
};

// Verificar contraseña
Admin.comparePassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword); // Comparar contraseñas
};

module.exports = Admin;
