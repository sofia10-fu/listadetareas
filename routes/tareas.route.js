const express = require('express');
const router = express.Router();
const Tarea = require('../models/tarea.model');

// ==========================================
// ENDPOINTS CRUD BÁSICOS
// ==========================================

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

// ==========================================
// ENDPOINTS DE NEGOCIO
// ==========================================

// 1. PUT - Marcar como completada: /tareas/:id/completar[cite: 9]
router.put('/:id/completar', async (req, res) => {
    try {
        const tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }
        
        // Lógica de negocio: cambiar estado de completada
        tarea.completada = true;
        const tareaActualizada = await tarea.save();
        
        res.json(tareaActualizada);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al marcar la tarea como completada', error: error.message });
    }
});

// 2. GET - Filtrar por prioridad: /tareas/prioridad/:nivel[cite: 9]
router.get('/prioridad/:nivel', async (req, res) => {
    try {
        const { nivel } = req.params;
        const tareas = await Tarea.find({ prioridad: nivel });
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al filtrar las tareas por prioridad', error: error.message });
    }
});

// 3. GET - Próximas a vencer: /tareas/proximas-vencer/:dias[cite: 9]
router.get('/proximas-vencer/:dias', async (req, res) => {
    try {
        const dias = parseInt(req.params.dias);
        const hoy = new Date();
        const fechaLimiteMax = new Date();
        
        // Calcular fecha límite sumando los días usando lógica de fechas
        fechaLimiteMax.setDate(hoy.getDate() + dias);

        const tareas = await Tarea.find({
            completada: false,
            fechaLimite: { $gte: hoy, $lte: fechaLimiteMax }
        });
        
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las tareas próximas a vencer', error: error.message });
    }
});

module.exports = router;