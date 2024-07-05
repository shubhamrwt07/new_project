const mongoose= require("mongoose")
const {Schema} = mongoose;
const newUserDiscountSchema = new Schema({
    discountPercentage: {
        type: Number,
        required: true,
        default: 0
    }
});
const NewUserDiscount = mongoose.model("NewUserDiscount", newUserDiscountSchema);

module.exports = NewUserDiscount;
