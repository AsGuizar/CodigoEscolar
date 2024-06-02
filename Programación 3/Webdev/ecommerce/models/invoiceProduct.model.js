const sql = require('../config/db.config.js');

const InvoiceProduct = function(invoiceProduct) {
  this.cantidad = invoiceProduct.cantidad;
  this.precioVenta = invoiceProduct.precioVenta;
  this.facturaId = invoiceProduct.facturaId;
  this.productoId = invoiceProduct.productoId;
};

InvoiceProduct.create = (newInvoiceProduct, result) => {
  sql.query("INSERT INTO productos_factura SET ?", newInvoiceProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created invoice product: ", { id: res.insertId, ...newInvoiceProduct });
    result(null, { id: res.insertId, ...newInvoiceProduct });
  });
};

module.exports = InvoiceProduct;
