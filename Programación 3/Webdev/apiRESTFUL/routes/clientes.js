const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/clientes');

// Ruta para obtener un cliente por ID
router.get('/:id', clientesController.getClienteById);

// Ruta para agregar un nuevo cliente
router.post('/', clientesController.agregarCliente);

module.exports = router;
