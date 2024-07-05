const mongoose = require("mongoose");

const referralSchema = mongoose.Schema({
    couponName: {
        type: String,
        required: true
    },
    couponCode: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        enum: ['festive','shareable', 'multiuser', 'newUser'],
        // required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    sharedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    count: {
        type: Number,
        // required: true
    },
    usedCount: {
        type: Number,
        default: 0 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    minOrderValue: {
        type: Number,
        required: true,
        min: 0 
    },
    maxOrderValue: {
        type: Number,
        required: true,
        max: 5000 
    },
    discount: {
        type: Number,
        default:0
    }
}, {
    timestamps: true
});

const referralModel = mongoose.model('referrals', referralSchema);
module.exports = referralModel;

