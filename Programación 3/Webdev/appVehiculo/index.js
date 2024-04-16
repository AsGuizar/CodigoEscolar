const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let vehiculos = [];

app.use(bodyParser.json());

// GET all vehicles
app.get('/vehiculos', (req, res) => {
    res.json(vehiculos);
});

// GET vehicle by placa
app.get('/vehiculos/:placa', (req, res) => {
    const vehiculo = vehiculos.find(v => v.placa === req.params.placa);
    if (vehiculo) {
        res.json(vehiculo);
    } else {
        res.status(404).json({ message: 'Vehículo no encontrado' });
    }
});

// POST new vehicle
app.post('/vehiculos', (req, res) => {
    const { placa, marca, modelo } = req.body;

    if (vehiculos.some(v => v.placa === placa)) {
        res.status(400).json({ message: 'Vehículo con la misma placa ya existe' });
    } else {
        vehiculos.push({ placa, marca, modelo });
        res.json({ message: 'Vehículo agregado correctamente' });
    }
});

// DELETE vehicle by placa
app.delete('/vehiculos/:placa', (req, res) => {
    const index = vehiculos.findIndex(v => v.placa === req.params.placa);
    if (index !== -1) {
        vehiculos.splice(index, 1);
        res.json({ message: 'Vehículo eliminado correctamente' });
    } else {
        res.status(404).json({ message: 'Vehículo no encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
