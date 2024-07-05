const mongoose = require("mongoose");
const { Schema } = mongoose;

const productModel = new Schema(
    {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        subcategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category.subcategories", 
            required: true
        },
        companyName: {
            type: String,
        },
        name: {
            type: String,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            default: 0,
        },
        discountedPrice: {
             type: Number 
            }

    },
    { versionKey: false, timestamps: true }
);

const product = mongoose.model("Product", productModel);

module.exports = product;
