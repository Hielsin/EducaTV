const express = require('express');
const router = express.Router();
const Admin = require('../modelos/Admin');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar administrador por correo electrónico
    const admin = await Admin.findByEmail(email);
    if (!admin) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña ingresada con la almacenada
    const isPasswordValid = await Admin.comparePassword(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Simular generación de token (puedes usar JWT aquí)
    res.json({ message: 'Inicio de sesión exitoso', token: 'fake-jwt-token' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
