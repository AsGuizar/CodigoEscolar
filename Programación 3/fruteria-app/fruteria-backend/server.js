const express = require('express');
const cors = require('cors');
const db = require('./database/db'); // Importa la conexión a la base de datos
const informesController = require('./controllers/informesController'); // Importa el controlador de informes

const app = express();
const port = process.env.PORT || 3001;

// Configura CORS como middleware
app.use(cors());

// Configura middleware para manejar solicitudes JSON
app.use(express.json());

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('¡Backend de la frutería funcionando!');
});

// Ruta para obtener la lista de productos
app.get('/api/productos', (req, res) => {
  db.query('SELECT * FROM Productos', (err, results) => {
    if (err) {
      console.error('Error al obtener la lista de productos:', err);
      res.status(500).json({ error: 'Error al obtener productos' });
    } else {
      res.json({ productos: results });
    }
  });
});

// Ruta para registrar una venta
app.post('/api/ventas', (req, res) => {
  const ventaData = req.body;
  db.query('INSERT INTO Ventas (fecha, total) VALUES (?, ?)', [ventaData.fecha, ventaData.total], (err, results) => {
    if (err) {
      console.error('Error al registrar la venta:', err);
      res.status(500).json({ error: 'Error al registrar la venta' });
    } else {
      res.status(200).json({ mensaje: 'Venta registrada con éxito' });
    }
  });
});

// Ruta para generar el informe de ventas diarias
app.use('/api/informes', informesController);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
