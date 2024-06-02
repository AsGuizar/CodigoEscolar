const authJwt = require("../middleware/auth.middleware.js"); // Explicitly reference the file
const products = require("../controllers/product.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new product
  app.post("/api/products", [authJwt.verifyToken], products.createProduct);

  // Update product quantity
  app.put("/api/products/:id", [authJwt.verifyToken], products.updateQuantity);

  // Get all products
  app.get("/api/products", [authJwt.verifyToken], products.getAllProducts);
};
