const db = require('../db'); // Importa la conexión a la base de datos

// Función de controlador para obtener un cliente por ID
function getClienteById(req, res) {
    const clienteId = req.params.id;
    const sql = 'SELECT * FROM clientes WHERE id = ?';
    db.query(sql, [clienteId], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener el cliente de la base de datos' });
            throw err;
        }
        if (result.length === 0) {
            res.status(404).json({ message: 'Cliente no encontrado' });
        } else {
            res.json(result[0]);
        }
    });
}

// Función de controlador para agregar un nuevo cliente
function agregarCliente(req, res) {
    const { nombre, correo } = req.body;
    const sql = 'INSERT INTO clientes (nombre, correo) VALUES (?, ?)';
    db.query(sql, [nombre, correo], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al agregar el cliente a la base de datos' });
            throw err;
        }
        const clienteId = result.insertId;
        res.status(201).json({ id: clienteId });
    });
}

module.exports = {
    getClienteById,
    agregarCliente
};

