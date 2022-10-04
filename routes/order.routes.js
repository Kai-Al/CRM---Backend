const { authJwt } = require("../middlewares");
const controller = require("../controllers/order.controller");

module.exports = function (app) {

  app.post("/api/order/new", controller.newOrder);

  app.get("/api/order/all", controller.getAllOrders);

  app.get("/api/order/:id", controller.getOrder);

  app.put(
    "/api/order/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateOrder
  );

  app.delete(
    "/api/order/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteOrder
  );
};
