const Product = require("../models/product.model.js");

exports.createProduct = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const product = new Product({
    nombre: req.body.nombre,
    cantidad: req.body.cantidad,
    precio: req.body.precio
  });

  Product.create(product, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Product."
      });
    } else {
      res.send(data);
    }
  });
};

exports.updateQuantity = (req, res) => {
  Product.updateQuantity(req.params.id, req.body.cantidad, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Product with id " + req.params.id
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.getAllProducts = (req, res) => {
  Product.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products."
      });
    } else {
      res.send(data);
    }
  });
};
