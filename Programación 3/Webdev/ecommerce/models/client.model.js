const sql = require('../config/db.config.js');

const Client = function(client) {
  this.nombre = client.nombre;
  this.direccion = client.direccion;
  this.usuarioId = client.usuarioId;
};

Client.create = (newClient, result) => {
  sql.query("INSERT INTO clientes SET ?", newClient, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created client: ", { id: res.insertId, ...newClient });
    result(null, { id: res.insertId, ...newClient });
  });
};

module.exports = Client;
