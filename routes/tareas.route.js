const express = require('express');
const router = express.Router();
const Tarea = require('../models/tarea.model');

// GET - Obtener todas las tareas
router.get('/', async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las tareas', error: error.message });
    }
});

// GET - Obtener una tarea por ID
router.get('/:id', async (req, res) => {
    try {
        const tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }
        res.json(tarea);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la tarea', error: error.message });
    }
});

// POST - Crear una nueva tarea
router.post('/', async (req, res) => {
    try {
        const nuevaTarea = new Tarea(req.body);
        const tareaGuardada = await nuevaTarea.save();
        res.status(201).json(tareaGuardada);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear la tarea', error: error.message });
    }
});

// PUT - Actualizar una tarea
router.put('/:id', async (req, res) => {
    try {
        const tarea = await Tarea.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!tarea) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }
        res.json(tarea);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar la tarea', error: error.message });
    }
});

// DELETE - Eliminar una tarea
router.delete('/:id', async (req, res) => {
    try {
        const tarea = await Tarea.findByIdAndDelete(req.params.id);
        if (!tarea) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }
        res.json({ mensaje: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la tarea', error: error.message });
    }
});

module.exports = router;