const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
require('dotenv').config();
const mysql = require('mysql2/promise');

async function createOrder(req, res) {
    try {
        // Verificar si req.body.items es un arreglo
        if (!Array.isArray(req.body.items)) {
            return res.status(400).json({ error: "Items must be an array" });
        }

        // Crear una conexión a la base de datos
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        // Iniciar una transacción
        await connection.beginTransaction();

        // Iterar sobre los elementos en req.body.items
        for (const item of req.body.items) {
            const productId = item.product_id;
            const quantity = item.quantity;

            // Ejecutar la consulta para actualizar la cantidad de productos
            await connection.execute('UPDATE productos SET cantidad = cantidad - ? WHERE id = ?', [quantity, productId]);
        }

        // Confirmar la transacción
        await connection.commit();

        // Cerrar la conexión
        await connection.end();

        // Enviar respuesta exitosa
        res.status(200).json({ message: "Order created successfully" });
    } catch (error) {
        // En caso de error, deshacer la transacción y enviar una respuesta de error
        await connection.rollback();
        await connection.end();
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { createOrder };
