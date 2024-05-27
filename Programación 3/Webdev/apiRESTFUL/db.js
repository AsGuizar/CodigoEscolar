// db.js

const mysql = require('mysql');

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'angel', // Usuario de la base de datos
    password: 'angel', // Contraseña del usuario de la base de datos
    database: 'nuevabasededatos' // Nombre de la base de datos
});
module.exports = db;
