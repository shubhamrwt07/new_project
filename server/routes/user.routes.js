const userController = require("../controller/user.controller")


module.exports = function Route(app) {
    app.post("/api/users/logIn",  userController.login);
    app.post("/api/users/signUp", userController.register);
}