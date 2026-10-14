const express = require('express');
const conectarDB = require('./config/db');
const tareasRutas = require('./routes/tareas.route');

const app = express();

// Conectar a la base de datos
conectarDB();

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Rutas
app.use('/api/tareas', tareasRutas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});