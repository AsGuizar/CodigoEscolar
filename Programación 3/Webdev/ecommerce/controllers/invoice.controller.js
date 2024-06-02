const Invoice = require("../models/invoice.model.js");
const InvoiceProduct = require("../models/invoiceProduct.model.js");
const Product = require("../models/product.model.js");

exports.createInvoice = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const invoice = new Invoice({
    fecha: req.body.fecha,
    total: req.body.total,
    clienteId: req.body.clienteId
  });

  Invoice.create(invoice, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Invoice."
      });
    } else {
      res.send(data);
    }
  });
};

exports.addProductToInvoice = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Product.findById(req.body.productoId, (err, product) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving Product with id " + req.body.productoId
      });
      return;
    }

    if (product.cantidad < req.body.cantidad) {
      res.status(400).send({
        message: "Not enough stock for the operation"
      });
      return;
    }

    const invoiceProduct = new InvoiceProduct({
      cantidad: req.body.cantidad,
      precioVenta: product.precio,
      facturaId: req.body.facturaId,
      productoId: req.body.productoId
    });

    InvoiceProduct.create(invoiceProduct, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while adding the Product to the Invoice."
        });
      } else {
        Product.updateQuantity(req.body.productoId, product.cantidad - req.body.cantidad, (err, data) => {
          if (err) {
            res.status(500).send({
              message: "Error updating Product quantity"
            });
            return;
          }

          res.send(data);
        });
      }
    });
  });
};

exports.getAllInvoices = (req, res) => {
  Invoice.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving invoices."
      });
    } else {
      res.send(data);
    }
  });
};
