const { authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/new",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.newProduct
  );

  app.get("/all", controller.getAllProducts);

  app.get("/:id", controller.getProduct);

  app.put(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateProduct
  );

  app.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteProduct
  );
};
