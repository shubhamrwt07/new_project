const mongoose = require("mongoose");
const { Schema } = mongoose;
const globalDiscountSchema = new Schema({
    discountPercentage: {
        type: Number,
        required: true,
        default: 0
    }
});
const GlobalDiscount = mongoose.model("GlobalDiscount", globalDiscountSchema);

module.exports = GlobalDiscount;
