const { authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");


module.exports = function (app) {
  app.post(
    "/api/product/new",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.newProduct
  );

  app.get("/api/product/all", controller.getAllProducts);

  app.get("/api/product/:id", controller.getProduct);

  app.put(
    "/api/product/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateProduct
  );

  app.delete(
    "/api/product/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteProduct
  );
};
