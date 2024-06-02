const sql = require('../config/db.config.js');

const Invoice = function(invoice) {
  this.fecha = invoice.fecha;
  this.total = invoice.total;
  this.clienteId = invoice.clienteId;
};

Invoice.create = (newInvoice, result) => {
  sql.query("INSERT INTO facturas SET ?", newInvoice, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created invoice: ", { id: res.insertId, ...newInvoice });
    result(null, { id: res.insertId, ...newInvoice });
  });
};

Invoice.getAll = result => {
  sql.query("SELECT * FROM facturas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Invoice;
