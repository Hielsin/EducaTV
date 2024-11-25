const express = require('express');
const router = express.Router();
const Carrusel = require('../modelos/Carrusel');
const multer = require('multer');
const path = require('path');

// Configuración de Multer para subir imágenes a la carpeta `uploads/carrusel`
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/carrusel/'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
    }
});

const upload = multer({ storage });

// **Ruta para subir una nueva imagen**
router.post('/', upload.single('imagen'), async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        const imagenPath = req.file ? `/uploads/carrusel/${req.file.filename}` : null;

        const nuevaImagen = await Carrusel.create({ titulo, descripcion, imagen: imagenPath });
        res.status(201).json(nuevaImagen);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// **Ruta para obtener todas las imágenes del carrusel**
router.get('/', async (req, res) => {
    try {
        const imagenes = await Carrusel.findAll();
        res.json(imagenes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// **Ruta para eliminar una imagen del carrusel**
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Carrusel.destroy({ where: { id: req.params.id } });
        if (eliminado) {
            res.json({ mensaje: 'Imagen eliminada' });
        } else {
            res.status(404).json({ error: 'Imagen no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
