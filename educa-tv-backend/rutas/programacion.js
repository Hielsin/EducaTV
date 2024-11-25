// rutas/programacion.js
const express = require('express');
const router = express.Router();
const Programacion = require('../modelos/Programacion');
const multer = require('multer');
const path = require('path');

// Configuración de multer para cargar imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/imagenes/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para el archivo de imagen
    }
});

const upload = multer({ storage: storage });

// Crear una nueva programación
router.post('/', upload.single('imagen'), async (req, res) => {
    try {
        const { titulo, descripcion, fecha, hora_inicio, hora_fin, categoria } = req.body;
        const imagen = req.file ? `/uploads/imagenes/${req.file.filename}` : null;

        const programacion = await Programacion.create({
            titulo,
            descripcion,
            fecha,
            hora_inicio,
            hora_fin,
            categoria,
            imagen,
        });

        res.status(201).json(programacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todas las programaciones
router.get('/', async (req, res) => {
    try {
        const programaciones = await Programacion.findAll();
        res.json(programaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una programación por ID
router.get('/:id', async (req, res) => {
    try {
        const programacion = await Programacion.findByPk(req.params.id);
        if (programacion) {
            res.json(programacion);
        } else {
            res.status(404).json({ error: 'Programación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una programación
router.put('/:id', upload.single('imagen'), async (req, res) => {
    try {
        const { titulo, descripcion, fecha, hora_inicio, hora_fin, categoria } = req.body;
        const programacion = await Programacion.findByPk(req.params.id);

        if (programacion) {
            programacion.titulo = titulo;
            programacion.descripcion = descripcion;
            programacion.fecha = fecha;
            programacion.hora_inicio = hora_inicio;
            programacion.hora_fin = hora_fin;
            programacion.categoria = categoria;
            if (req.file) {
                programacion.imagen = `/uploads/imagenes/${req.file.filename}`;
            }

            await programacion.save();
            res.json(programacion);
        } else {
            res.status(404).json({ error: 'Programación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una programación
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Programacion.destroy({ where: { id: req.params.id } });
        if (eliminado) {
            res.json({ mensaje: 'Programación eliminada' });
        } else {
            res.status(404).json({ error: 'Programación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
