const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

 

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

 

// Método GET para sumar dos números

app.get('/sumar', (req, res) => {  

  const numero1 = parseInt(req.query.numero1);

  const numero2 = parseInt(req.query.numero2);

  const resultado = numero1 + numero2;

  res.send(`El resultado de sumar ${numero1} y ${numero2} es: ${resultado}`);

});

 

// Método POST para restar dos números

app.post('/restar', (req, res) => {

    const numero1 = parseInt(req.body.numero1);

    const numero2 = parseInt(req.body.numero2);

    console.log(numero1);

    console.log(numero2);

    const resultado = numero1 - numero2;

    res.json({resultado});

  });

 // multiplicacion por post metodo raw

 app.post('/multiplicacion', (req, res) => {

  const numero1 = parseFloat(req.body.numero1);

  const numero2 = parseFloat(req.body.numero2);

console.log(numero1+" -- "+numero2)

  if (isNaN(numero1) || isNaN(numero2)) {

    res.send('Error: Los valores proporcionados deben ser números.');

    return;

  }

 

  const resultado = numero1 * numero2;

  res.send(resultado.toString());

});

 

// Iniciar el servidor

app.listen(3000, () => {

  console.log('Servidor iniciado en el puerto 3000');

});

 