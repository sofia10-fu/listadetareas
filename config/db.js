const mongoose = require("mongoose")

// Funcion para conectar a la base de datos de MongoDB
const conectarDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/tareas")
    console.log("Conexion a la base de datos establecida")
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error)
    process.exit(1) // Salir del proceso con un codigo de error
  }
}

module.exports = conectarDB