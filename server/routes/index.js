module.exports = function (app) {
    // app.use(function (req, res, next) {
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "x-access-token, Origin, Content-Type, Accept"
    //     );
    //     next();
    // });

    require("./user.routes")(app)
    require("./product.routes")(app)
    require("./category.routes")(app)
    require("./googleAuth.routes")(app)
    require("./refferral.routes")(app)
    require("./order.routes")(app)



    
}