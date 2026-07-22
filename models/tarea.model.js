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
})

module.exports = mongoose.model("Tarea", tareaSchema)