const productController = require("../controller/product.controller");
const { upload } = require("../middleware/multer");

module.exports = function Route(app) {
  app.post("/api/createProduct", upload.single("image",), productController.createProduct);
  app.get("/api/getAllProducts", productController.getAllProducts);
  app.get("/api/getOneProduct/:id", productController.getOneProduct);
  app.delete("/api/deleteProduct/:id", productController.deleteProduct);
};
