const orderController = require("../controller/order.controller");
module.exports = function Route(app) {
app.get("/getOrder", orderController.getOrder);
// app.post("/addShippingAddress", orderController.addShippingAddress);
// app.get("/getShippingAddress", orderController.getShippingAddress);
}


