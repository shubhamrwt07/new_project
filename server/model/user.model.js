const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModel = new Schema(
    {
        firstName:{
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    },
    { versionKey: false, timestamps: true }
);

const user = mongoose.model("users", userModel);

module.exports = user;