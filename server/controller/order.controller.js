const orderModel = require("../model/order.model");


//getAllOrders
const getOrder = async (req, res) => {
    try {
        const { orderId } = req.query;
        if (!orderId) {
            return res.status(400).json({ status: 400, message: "Order ID is required" });
        };
        const orderData = await orderModel.findById(orderId)
            .populate('userId')
            .populate('productId')
            .populate('couponId');
        // console.log(orderData, "hit=======");

        if (!orderData) {
        };
        return res.status(200).json({ status: 200, message: "Order data fetched successfully", response: orderData });
        ;
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    };
};

//addAddress
// const addShippingAddress = async (req, res) => {
//     try {
//         const {
//             orderId,
//             address1,
//             address2,
//             landmark,
//             city,
//             state,
//             country,
//             pincode
//         } = req.body;
//         if (!userId || !orderId || !address1 || !address2 || !landmark || !city || !state || !country || !pincode) {
//             return res.status(400).json({ error: 'All Feilds are Required' });
//         }
//         const shippingDetails = new shippingModel({
//             userId,
//             orderId,
//             address1,
//             address2,
//             landmark,
//             city,
//             state,
//             country,
//             pincode
//         });
//         const savedShippingDetails = await shippingDetails.save();
//         res.status(201).json(savedShippingDetails);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     };
// };


//getAllAddress
// const getShippingAddress = async (req, res) => {
//     try {
//         const shippingDetails = await shippingModel.find().select();
//         if (!shippingDetails) {
//             return res.status(404).json({ error: 'Shipping address not found' });
//         }
//         res.status(200).json(shippingDetails);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     };
// };



module.exports = {
    getOrder,
    // addShippingAddress,
    // getShippingAddress

}