const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const vehiculos = [];

app.use(bodyParser.json());
app.use(cors());

app.get('/vehiculos/:placa', (req, res) => {
    const placa = req.params.placa;
    const vehiculo = vehiculos.find(v => v.placa === placa);
    if (vehiculo) {
        res.json(vehiculo);
    } else {
        res.status(404).json({ error: 'Vehículo no encontrado' });
    }
});

app.delete('/vehiculos/:placa', (req, res) => {
    const placa = req.params.placa;
    const index = vehiculos.findIndex(v => v.placa === placa);
    if (index !== -1) {
        vehiculos.splice(index, 1);
        res.json({ tipo: 'eliminar' });
    } else {
        res.status(404).json({ error: 'Vehículo no encontrado' });
    }
});

app.post('/vehiculos', (req, res) => {
    const { placa, marca, modelo } = req.body;
    const existe = vehiculos.some(v => v.placa === placa);
    if (!existe) {
        const nuevoVehiculo = { placa, marca, modelo };
        vehiculos.push(nuevoVehiculo);
        res.json({ tipo: 'agregar', vehiculo: nuevoVehiculo });
    } else {
        res.status(400).json({ error: 'El vehículo ya existe' });
    }
});

app.get('/vehiculos', (req, res) => {
    res.json(vehiculos);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
