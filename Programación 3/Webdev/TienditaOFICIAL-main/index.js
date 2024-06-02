const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.post('/orders', async (req, res) => {
    const productos = req.body.productos;

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        await connection.beginTransaction();

        for (const producto of productos) {
            const productId = producto.id;
            const cantidad = producto.cantidad;

            await connection.query('UPDATE productos SET cantidad = cantidad - ? WHERE id = ?', [cantidad, productId]);
        }

        await connection.commit();
        await connection.end();
        res.status(200).json({ message: 'La orden se hizo exitosamente.' });

    } catch (error) {
        console.error('Error:', error);
        await connection.rollback();
        await connection.end();
        res.status(500).json({ error: 'Ocurrio un error al hacer la orden.' });
    }
});

const PORT = process.env.PORT || 3000;

const router = require('./routers/routes.js');
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
