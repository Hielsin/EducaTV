const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./conexion_bd');
const dotenv = require('dotenv');

dotenv.config(); // Carga variables de entorno desde el archivo .env

// Importación de modelos
const Noticias = require('./modelos/Noticias');
const Videos = require('./modelos/Videos');
const Programacion = require('./modelos/Programacion');
const EnVivo = require('./modelos/EnVivo');
const Deportes = require('./modelos/Deportes');
const Articulos = require('./modelos/Articulos');
const Contactos = require('./modelos/Contactos');
const Carrusel = require('./modelos/Carrusel');
const Admin = require('./modelos/Admin'); // Modelo de autenticación

// Importación de rutas
const rutasNoticias = require('./rutas/noticias');
const rutasVideos = require('./rutas/videos');
const rutasProgramacion = require('./rutas/programacion');
const rutasEnVivo = require('./rutas/en_vivo');
const rutasDeportes = require('./rutas/deportes');
const rutasArticulos = require('./rutas/articulos');
const rutasContactos = require('./rutas/contactos');
const rutasCarrusel = require('./rutas/carrusel');
const authRoutes = require('./rutas/auth'); // Rutas de autenticación

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sincronización de modelos con la base de datos
sequelize
  .sync({ alter: true }) // alter: true para actualizar las tablas sin pérdida de datos
  .then(() => console.log('Base de datos y modelos sincronizados'))
  .catch(error => console.error('Error al sincronizar la base de datos:', error));

// Uso de rutas para cada sección de la aplicación
app.use('/api/noticias', rutasNoticias);
app.use('/api/videos', rutasVideos);
app.use('/api/programacion', rutasProgramacion);
app.use('/api/en_vivo', rutasEnVivo);
app.use('/api/deportes', rutasDeportes);
app.use('/api/articulos', rutasArticulos);
app.use('/api/contactos', rutasContactos);
app.use('/api/carrusel', rutasCarrusel);
app.use('/api/auth', authRoutes); // Ruta para autenticación de administradores

// Configuración del puerto
const PUERTO = process.env.PORT || 5000;
app.listen(PUERTO, () => {
  console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});
