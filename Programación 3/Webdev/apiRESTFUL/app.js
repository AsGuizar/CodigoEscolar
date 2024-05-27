const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'angel', // Usuario de la base de datos
    password: 'angel', // Contraseña del usuario de la base de datos
    database: 'nuevabasededatos' // Nombre de la base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

let router = require('./routes');
app.use('/api', router);

app.listen(3000, () => {
    console.log("Escuchando en puerto 3000");
});
