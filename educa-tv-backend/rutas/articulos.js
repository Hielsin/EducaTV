const express = require('express');
const router = express.Router();
const Articulo = require('../modelos/Articulos'); // Importa el modelo
const multer = require('multer');
const path = require('path');

// Configuración de multer para guardar las imágenes en la carpeta 'uploads/articulos'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/articulos/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
    }
});

const upload = multer({ storage: storage });

// Crear un artículo
router.post('/', upload.single('imagen'), async (req, res) => {
    try {
        const { titulo, descripcion, autor, fecha, destacada } = req.body;
        const imagen = req.file ? `/uploads/articulos/${req.file.filename}` : null; // Ruta de la imagen

        const articulo = await Articulo.create({
            titulo,
            descripcion,
            autor,
            fecha,
            destacada: destacada === 'true', // Convierte a booleano si viene como texto
            imagen
        });

        res.status(201).json(articulo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todos los artículos
router.get('/', async (req, res) => {
    try {
        const articulos = await Articulo.findAll();
        res.json(articulos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un artículo por ID
router.get('/:id', async (req, res) => {
    try {
        const articulo = await Articulo.findByPk(req.params.id);
        if (articulo) {
            res.json(articulo);
        } else {
            res.status(404).json({ error: 'Artículo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un artículo
router.put('/:id', upload.single('imagen'), async (req, res) => {
    try {
        const { titulo, descripcion, autor, fecha, destacada } = req.body;
        const imagen = req.file ? `/uploads/articulos/${req.file.filename}` : null;

        const [actualizado] = await Articulo.update(
            {
                titulo,
                descripcion,
                autor,
                fecha,
                destacada: destacada === 'true',
                imagen: imagen || req.body.imagen // Mantiene la imagen actual si no se sube una nueva
            },
            { where: { id: req.params.id } }
        );

        if (actualizado) {
            const articuloActualizado = await Articulo.findByPk(req.params.id);
            res.json(articuloActualizado);
        } else {
            res.status(404).json({ error: 'Artículo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un artículo
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Articulo.destroy({ where: { id: req.params.id } });
        if (eliminado) {
            res.json({ mensaje: 'Artículo eliminado' });
        } else {
            res.status(404).json({ error: 'Artículo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
