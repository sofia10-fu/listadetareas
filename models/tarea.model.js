const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  completada: {
    type: Boolean,
    default: false,
  },
  prioridad: {
    type: String,
    required: true,
    enum: ['baja', 'media', 'alta'] // Opcional, pero recomendado para restringir valores
  },
  fechaLimite: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model("Tarea", tareaSchema);