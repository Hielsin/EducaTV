// rutas/contactos.js
const express = require('express');
const router = express.Router();
const Contactos = require('../modelos/Contactos');

// Crear un mensaje de contacto
router.post('/', async (req, res) => {
    try {
        const contacto = await Contactos.create(req.body);
        res.status(201).json(contacto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el mensaje de contacto: ' + error.message });
    }
});

// Obtener todos los mensajes de contacto
router.get('/', async (req, res) => {
    try {
        const contactos = await Contactos.findAll();
        res.json(contactos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los mensajes de contacto: ' + error.message });
    }
});

// Obtener un mensaje de contacto por ID
router.get('/:id', async (req, res) => {
    try {
        const contacto = await Contactos.findByPk(req.params.id);
        if (contacto) {
            res.json(contacto);
        } else {
            res.status(404).json({ error: 'Mensaje de contacto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el mensaje de contacto: ' + error.message });
    }
});

// Marcar un mensaje de contacto como leído
router.put('/:id', async (req, res) => {
    try {
        const contacto = await Contactos.findByPk(req.params.id);
        if (!contacto) {
            return res.status(404).json({ error: 'Mensaje de contacto no encontrado' });
        }

        // Actualiza solo el campo 'leido' si es necesario
        contacto.leido = req.body.leido !== undefined ? req.body.leido : contacto.leido;
        await contacto.save();

        res.json(contacto);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado del mensaje de contacto: ' + error.message });
    }
});

// Eliminar un mensaje de contacto
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Contactos.destroy({ where: { id: req.params.id } });
        if (eliminado) {
            res.json({ mensaje: 'Mensaje de contacto eliminado' });
        } else {
            res.status(404).json({ error: 'Mensaje de contacto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el mensaje de contacto: ' + error.message });
    }
});

module.exports = router;
