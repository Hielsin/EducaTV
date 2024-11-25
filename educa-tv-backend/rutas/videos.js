// videos.js
const express = require('express');
const router = express.Router();
const Videos = require('../modelos/Videos');
const multer = require('multer');
const path = require('path');

// Configuración de multer para guardar los videos en la carpeta 'uploads/videos'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/videos/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para el archivo de video
    }
});

const upload = multer({ storage: storage });

// Crear un video con archivo de video
router.post('/', upload.single('video'), async (req, res) => {
    try {
        const { titulo, descripcion, categoria } = req.body;
        const videoPath = req.file ? `/uploads/videos/${req.file.filename}` : null; // Usar `video`

        const video = await Videos.create({ titulo, descripcion, categoria, video: videoPath });
        res.status(201).json(video);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todos los videos
router.get('/', async (req, res) => {
    try {
        const videos = await Videos.findAll();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un video por ID
router.get('/:id', async (req, res) => {
    try {
        const video = await Videos.findByPk(req.params.id);
        if (video) {
            res.json(video);
        } else {
            res.status(404).json({ error: 'Video no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un video con archivo de video
router.put('/:id', upload.single('video'), async (req, res) => {
    try {
        const { titulo, descripcion, categoria } = req.body;
        const videoPath = req.file ? `/uploads/videos/${req.file.filename}` : null; // Usar `video`

        const video = await Videos.findByPk(req.params.id);
        if (video) {
            video.titulo = titulo;
            video.descripcion = descripcion;
            video.categoria = categoria;
            if (videoPath) video.video = videoPath; // Actualizar `video` si se ha subido un nuevo archivo

            await video.save();
            res.json(video);
        } else {
            res.status(404).json({ error: 'Video no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un video
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Videos.destroy({ where: { id: req.params.id } });
        if (eliminado) {
            res.json({ mensaje: 'Video eliminado' });
        } else {
            res.status(404).json({ error: 'Video no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
