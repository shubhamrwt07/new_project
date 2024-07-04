const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModel = new Schema(
    {
        firstName:{
            type: String,
        },
        lastName: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
        },
    },
    {timestamps: true }
);
const user = mongoose.model("users", userModel);

module.exports = user;