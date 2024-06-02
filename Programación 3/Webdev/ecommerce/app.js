// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes setup
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const invoiceRoutes = require('./routes/invoice.routes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/invoices', invoiceRoutes);

const PORT = process.env.PORT || 8080; // Change the default port to 8081 to avoid conflicts

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app; // Export the app object

// Optionally, you can export the server object as well if needed
module.exports.server = server;
