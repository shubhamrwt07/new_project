const mongoose = require("mongoose");
const { Schema } = mongoose;
const subcategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        }
    },
    { _id: false } 
);
const categoryModel = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        },
        subcategories: [
            subcategorySchema

        ] ,
    },
    { versionKey: false, timestamps: true }
);

const category = mongoose.model("category", categoryModel);

module.exports = category;
