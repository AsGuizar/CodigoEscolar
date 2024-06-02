const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise'); // Use promise-based mysql2
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing

const app = express();
const PORT = 3000;

// Configuración de conexión a la base de datos
const db = mysql.createPool({
  host: 'localhost',
  user: 'root', // Reemplaza con tu usuario de MySQL
  password: 'root', // Reemplaza con tu contraseña de MySQL
  database: 'tiendapro',
  port: 3310,
});

// Middleware para parsear JSON
app.use(express.json());

// Middleware para verificar el token de autenticación
function verificarToken(req, res, next) {
    let token = req.header('Authorization');
  
    // If token is not found in request headers, try retrieving it from localStorage
    if (!token) {
      token = JSON.parse(localStorage.getItem('jwt'));
    }
  
    if (!token) {
      return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
    }
  
    try {
      const decoded = jwt.verify(token, 'claveSecreta');
      req.usuario = decoded;
      next();
    } catch (err) {
      res.status(400).json({ error: 'Token inválido' });
    }
  }
  

// Definir una ruta raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la página de inicio!');
});

// Endpoint para el registro de usuarios
app.post('/api/clientes/registro', async (req, res) => {
  const { email, password, tipo } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Correo electrónico y contraseña son obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO clientes (email, password, tipo) VALUES (?, ?, ?)', [email, hashedPassword, tipo]);
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para el inicio de sesión de clientes
app.post('/api/clientes/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Correo electrónico y contraseña son obligatorios' });
  }

  try {
    const [results] = await db.query('SELECT * FROM clientes WHERE email = ?', [email]);

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'claveSecreta', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error al buscar usuario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para buscar productos
app.get('/api/clientes/productos', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM productos');
    res.json(results);
  } catch (err) {
    console.error('Error al buscar productos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para recuperar los pedidos del cliente
app.get('/api/clientes/pedidos', verificarToken, async (req, res) => {
    try {
      const token = req.header('Authorization').split(' ')[1];
      console.log('Token recibido:', token); 
      const decoded = jwt.verify(token, 'claveSecreta');
      const clienteId = decoded.id;
  
      // Retrieve orders for the authenticated client from the database
      const [orders] = await db.query('SELECT * FROM pedidos WHERE cliente_id = ?', [clienteId]);
      res.json(orders);
    } catch (err) {
      console.error('Error al buscar pedidos del cliente:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  

// Endpoint para crear un nuevo pedido con uno o más productos
app.post('/api/clientes/nuevo_pedido', verificarToken, async (req, res) => {
  const clienteId = req.usuario.id;
  const { productos } = req.body;

  if (!productos || !productos.length) {
    return res.status(400).json({ error: 'No se proporcionaron productos para el pedido' });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [result] = await connection.query('INSERT INTO pedidos (cliente_id) VALUES (?)', [clienteId]);
    const pedidoId = result.insertId;

    for (const producto of productos) {
      await connection.query('INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)', [pedidoId, producto.id, producto.cantidad]);
    }

    await connection.commit();
    res.status(201).json({ message: 'Pedido creado exitosamente' });
  } catch (err) {
    await connection.rollback();
    console.error('Error al crear pedido:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    connection.release();
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
