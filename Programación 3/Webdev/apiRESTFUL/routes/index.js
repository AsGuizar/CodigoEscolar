const express = require('express');
const router = express.Router();

let clientesRouter = require('./clientes');
router.use('/clientes', clientesRouter);

module.exports = router;
