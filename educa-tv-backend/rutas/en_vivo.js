const express = require('express');
const router = express.Router();
const EnVivo = require('../modelos/EnVivo');

// Crear una transmisión en vivo
router.post('/', async (req, res) => {
    try {
        const enVivo = await EnVivo.create(req.body);
        res.status(201).json(enVivo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todas las transmisiones en vivo
router.get('/', async (req, res) => {
    try {
        const enVivo = await EnVivo.findAll();
        res.json(enVivo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una transmisión en vivo por ID
router.get('/:id', async (req, res) => {
    try {
        const enVivo = await EnVivo.findByPk(req.params.id);
        if (enVivo) {
            res.json(enVivo);
        } else {
            res.status(404).json({ error: 'Transmisión en vivo no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una transmisión en vivo
router.put('/:id', async (req, res) => {
    try {
        const [actualizado] = await EnVivo.update(req.body, { where: { id: req.params.id } });
        if (actualizado) {
            const enVivoActualizado = await EnVivo.findByPk(req.params.id);
            res.json(enVivoActualizado);
        } else {
            res.status(404).json({ error: 'Transmisión en vivo no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una transmisión en vivo
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await EnVivo.destroy({ where: { id: req.params.id } });
        if (eliminado) {
            res.json({ mensaje: 'Transmisión en vivo eliminada' });
        } else {
            res.status(404).json({ error: 'Transmisión en vivo no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
