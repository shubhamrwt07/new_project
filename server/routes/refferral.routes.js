const referralController = require("../controller/refferral.controller");
const { deleteExpiredCoupons } = require("../middleware/jwt");

module.exports = function (app) {
  app.post("/generateCoupon", referralController.generateCoupon);
  app.post("/useCoupon", referralController.applyCoupon);
};
