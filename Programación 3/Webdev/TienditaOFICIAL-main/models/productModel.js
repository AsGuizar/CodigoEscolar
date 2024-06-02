const db = require('../database/db');

const getAllProducts = callback => {
    db.query('SELECT * FROM productos', callback);
};

const updateProductsStock = (stockMap, callback) => {
    const queries = [];
    for (const [id, cantidad] of Object.entries(stockMap)) {
        queries.push(`UPDATE productos SET cantidad = ${cantidad} WHERE id = ${id}`);
    }
    db.query(queries.join('; '), callback);
};

module.exports = { getAllProducts, updateProductsStock };
