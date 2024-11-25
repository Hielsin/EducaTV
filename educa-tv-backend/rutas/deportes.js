const express = require('express');
const router = express.Router();
const Deportes = require('../modelos/Deportes');
const multer = require('multer');
const path = require('path');

// Configuración de multer para almacenar las imágenes en una carpeta 'uploads/deportes'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/deportes/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
    }
});

const upload = multer({ storage: storage });

// Crear una noticia de deportes
router.post('/', upload.single('imagen'), async (req, res) => {
    try {
        const { titulo, descripcion, fecha, categoria, destacada } = req.body;

        // Validación para campos obligatorios
        if (!titulo || !descripcion) {
            return res.status(400).json({ error: "Los campos 'titulo' y 'descripcion' son obligatorios." });
        }

        const imagen = req.file ? `/uploads/deportes/${req.file.filename}` : null;

        const deporte = await Deportes.create({
            titulo,
            descripcion,
            fecha,
            categoria,
            destacada: destacada === 'true', // Convertir a booleano si viene como string
            imagen
        });

        res.status(201).json(deporte);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todas las noticias de deportes
router.get('/', async (req, res) => {
    try {
        const deportes = await Deportes.findAll();
        res.json(deportes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una noticia de deportes por ID
router.get('/:id', async (req, res) => {
    try {
        const deporte = await Deportes.findByPk(req.params.id);
        if (deporte) {
            res.json(deporte);
        } else {
            res.status(404).json({ error: 'Noticia de deportes no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una noticia de deportes
router.put('/:id', upload.single('imagen'), async (req, res) => {
    try {
        const { titulo, descripcion, fecha, categoria, destacada } = req.body;
        const imagen = req.file ? `/uploads/deportes/${req.file.filename}` : null;

        // Validación para campos obligatorios
        if (!titulo || !descripcion) {
            return res.status(400).json({ error: "Los campos 'titulo' y 'descripcion' son obligatorios." });
        }

        const [actualizado] = await Deportes.update(
            {
                titulo,
                descripcion,
                fecha,
                categoria,
                destacada: destacada === 'true',
                imagen
            },
            { where: { id: req.params.id } }
        );

        if (actualizado) {
            const deporteActualizado = await Deportes.findByPk(req.params.id);
            res.json(deporteActualizado);
        } else {
            res.status(404).json({ error: 'Noticia de deportes no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una noticia de deportes
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Deportes.destroy({ where: { id: req.params.id } });
        if (eliminado) {
            res.json({ mensaje: 'Noticia de deportes eliminada' });
        } else {
            res.status(404).json({ error: 'Noticia de deportes no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
