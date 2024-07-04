const mongoose = require("mongoose");
const { Schema } = mongoose;

const googleAuthModel = new Schema(
    {
        googleId:{
            type: String,
        },
        displayName: {
            type: String,
        },
        email: {
            type: String,
        }
        
    },
    { versionKey: false, timestamps: true }
);

const googleAuth = mongoose.model("googleAuth", googleAuthModel);

module.exports = googleAuth;