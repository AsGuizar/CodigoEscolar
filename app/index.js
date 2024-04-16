const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const numeros = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Usar middleware cors con opciones
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/numeros/:id', (req, res) => {
    const num = parseInt(req.params.id);
    const indice = numeros.indexOf(num);
    res.json({ tipo: 'busqueda', pos: indice });
});

app.delete('/numeros/:id', (req, res) => {
    const num = parseInt(req.params.id);
    const indice = numeros.indexOf(num);
    if (indice !== -1) {
        numeros.splice(indice, 1);
        res.json({ tipo: 'delete' });
    } else {
        res.status(404).json({ error: 'Número no encontrado' });
    }
});

app.post('/numeros', (req, res) => {
    const { num } = req.body;
    if (!isNaN(num)) {
        const indice = numeros.indexOf(num);
        if (indice === -1) {
            numeros.push(num);
            res.json({ tipo: 'agregar' });
        } else {
            res.status(400).json({ error: 'El número ya existe' });
        }
    } else {
        res.status(400).json({ error: 'El cuerpo de la solicitud no contiene un número válido' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
