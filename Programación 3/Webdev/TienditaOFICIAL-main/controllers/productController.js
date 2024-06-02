const productModel = require('../models/productModel');

const getProducts = (req, res) => {
    productModel.getAllProducts((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

module.exports = { getProducts };