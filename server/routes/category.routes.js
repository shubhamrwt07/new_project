const categoryController = require("../controller/category.controller")


module.exports = function Route(app) {
    app.post("/api/addCategory",  categoryController.addCategory);
    app.get("/api/getAllCategories", categoryController.getAllCategories);
    app.get("/api/getProductsByCategory", categoryController.getProductsByCategory);
}