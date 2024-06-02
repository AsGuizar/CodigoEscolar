const authJwt = require("../middleware/auth.middleware");
const controller = require("../controllers/invoice.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Here, we're using authJwt.verifyToken as middleware
  app.post("/api/invoices", [authJwt.verifyToken], controller.createInvoice);
};
