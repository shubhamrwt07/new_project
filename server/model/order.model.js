const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'referrals'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    price:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
        // required:true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"orders"
    },
    address1: {
        type: String,
        req: true
    },
    address2: {
        type: String,
        req: true
    },
    landmark: {
        type: String,
        req: true
    },
    city: {
        type: String,
        req: true
    },
    state: {
        type: String,
        req: true
    },
    country: {
        type: String,
        req: true
    },
    pincode: {
        type: Number,
        req: true
    },
}, {
    timestamps: true
});

const orderModel = mongoose.model('orders', orderSchema);
module.exports = orderModel;