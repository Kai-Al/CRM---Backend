const { authJwt } = require("../middlewares");
const controller = require("../controllers/order.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/new", controller.newOrder);

  app.get("/all", controller.getAllOrders);

  app.get("/:id", controller.getOrder);

  app.put(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateOrder
  );

  app.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteOrder
  );
};
