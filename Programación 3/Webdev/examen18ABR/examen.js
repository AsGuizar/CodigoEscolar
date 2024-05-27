const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Vector para almacenar los alumnos
let alumnos = [
    { numcuenta: '123456789', nombre: 'Juan Pérez', semestre: 5 },
    { numcuenta: '987654321', nombre: 'María López', semestre: 4 },
    { numcuenta: '111111111', nombre: 'Carlos Rodríguez', semestre: 6 }
];

// GET /alumnos - Retorna todos los alumnos
app.get('/alumnos', (req, res) => {
    res.json(alumnos);
}) 

// GET /alumnos/:numcuenta - Retorna un alumno específico por número de cuenta
app.get('/alumnos/:numcuenta', (req, res) => {
    const alumno = alumnos.find(a => a.numcuenta === req.params.numcuenta);
    if (alumno) {
        res.json(alumno);
    } else {
        res.status(404).json({ message: 'Alumno no encontrado' });
    }
}); 

// POST /alumnos - Agrega un nuevo alumno
app.post('/alumnos', (req, res) => {
    const { numcuenta, nombre, semestre } = req.body;

    // Verificar si el número de cuenta ya existe
    if (alumnos.some(a => a.numcuenta === numcuenta)) {
        return res.status(400).json({ message: 'El número de cuenta ya existe' });
    }

    const nuevoAlumno = { numcuenta, nombre, semestre };
    alumnos.push(nuevoAlumno);
    res.status(201).json(nuevoAlumno);
});


// PUT /alumnos/:numcuenta - Modifica un alumno por número de cuenta
app.put('/alumnos/:numcuenta', (req, res) => {
    const { numcuenta } = req.params;
    const { nombre, semestre } = req.body;

    const index = alumnos.findIndex(a => a.numcuenta === numcuenta);
    if (index !== -1) {
        alumnos[index] = {
            ...alumnos[index],
            nombre: nombre ? nombre : alumnos[index].nombre,
            semestre: semestre ? semestre : alumnos[index].semestre
        };
        res.json(alumnos[index]);
    } else {
        res.status(404).json({ message: 'Alumno no encontrado' });
    }
});

// DELETE /alumnos/:numcuenta - Elimina un alumno por número de cuenta
app.delete('/alumnos/:numcuenta', (req, res) => {
    const index = alumnos.findIndex(a => a.numcuenta === req.params.numcuenta);
    if (index !== -1) {
        const alumnoEliminado = alumnos.splice(index, 1);
        res.json(alumnoEliminado[0]);
    } else {
        res.status(404).json({ message: 'Alumno no encontrado' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});