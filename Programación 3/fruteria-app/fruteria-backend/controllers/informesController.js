// informesController.js

const express = require('express');
const mysql = require('mysql2'); // Asegúrate de tener esta dependencia instalada
const db = require('../database/db'); // Importa la conexión a la base de datos

const router = express.Router();

// Ruta para generar un informe de ventas diarias
router.get('/informeVentasDiarias', (req, res) => {
  try {
    // Realiza una consulta a la base de datos para obtener datos del informe de ventas diarias
    const query = `
      SELECT fecha, SUM(total) as totalVentas
      FROM Ventas
      GROUP BY fecha
      ORDER BY fecha;
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener el informe de ventas diarias:', err);
        res.status(500).json({ error: 'Error al generar el informe de ventas diarias' });
      } else {
        res.json({ informeVentasDiarias: results });
      }
    });
  } catch (error) {
    console.error('Error al generar el informe de ventas diarias:', error);
    res.status(500).json({ error: 'Error al generar el informe de ventas diarias' });
  }
});

module.exports = router;
