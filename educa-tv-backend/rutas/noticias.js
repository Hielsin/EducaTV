// noticias.js
const express = require('express');
const router = express.Router();
const Noticias = require('../modelos/Noticias');
const multer = require('multer');
const path = require('path');

// Configuración de multer para guardar las imágenes y videos en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para el archivo
    }
});

const upload = multer({ storage: storage });

// Crear una noticia con una imagen de portada y un video
router.post('/', upload.fields([{ name: 'portada', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
    try {
        const { titulo, contenido, categoria } = req.body;
        const portada = req.files['portada'] ? `/uploads/${req.files['portada'][0].filename}` : null; // Ruta de la imagen de portada
        const video = req.files['video'] ? `/uploads/${req.files['video'][0].filename}` : null; // Ruta del archivo de video

        const noticia = await Noticias.create({ titulo, contenido, categoria, portada, video });
        res.status(201).json(noticia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todas las noticias
router.get('/', async (req, res) => {
    try {
        const noticias = await Noticias.findAll();
        res.json(noticias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una noticia por ID
router.get('/:id', async (req, res) => {
    try {
        const noticia = await Noticias.findByPk(req.params.id);
        if (noticia) {
            res.json(noticia);
        } else {
            res.status(404).json({ error: 'Noticia no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una noticia con una imagen de portada y un video
router.put('/:id', upload.fields([{ name: 'portada', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
    try {
        const { titulo, contenido, categoria } = req.body;
        const portada = req.files['portada'] ? `/uploads/${req.files['portada'][0].filename}` : null;
        const video = req.files['video'] ? `/uploads/${req.files['video'][0].filename}` : null;

        const noticia = await Noticias.findByPk(req.params.id);
        if (noticia) {
            noticia.titulo = titulo;
            noticia.contenido = contenido;
            noticia.categoria = categoria;
            if (portada) noticia.portada = portada; // Actualiza solo si se ha cargado una nueva imagen
            if (video) noticia.video = video; // Actualiza solo si se ha cargado un nuevo video

            await noticia.save();
            res.json(noticia);
        } else {
            res.status(404).json({ error: 'Noticia no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una noticia
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Noticias.destroy({ where: { id: req.params.id } });
        if (eliminado) {
            res.json({ mensaje: 'Noticia eliminada' });
        } else {
            res.status(404).json({ error: 'Noticia no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
