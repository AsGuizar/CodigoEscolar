const User = require("../models/user.model.js");
const Client = require("../models/client.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    tipo: req.body.tipo
  });

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
      return;
    }

    if (req.body.tipo === 2) {
      const client = new Client({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        usuarioId: data.id
      });

      Client.create(client, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Client."
          });
          return;
        }
      });
    }

    res.send(data);
  });
};

exports.login = (req, res) => {
  User.findByEmail(req.body.email, (err, user) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with email ${req.body.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with email " + req.body.email
        });
      }
      return;
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      id: user.id,
      email: user.email,
      accessToken: token
    });
  });
};
