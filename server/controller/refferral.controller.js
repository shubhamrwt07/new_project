const referralModel = require("../model/refferral.model");
const userModel = require("../model/user.model");
const productModel = require("../model/product.model");
const orderModel = require("../model/order.model");

//generateCoupon
const generateCoupon = async (req, res) => {
  try {
    const {
      couponName,
      type,
      createdBy,
      discount,
      minOrderValue,
      maxOrderValue,
      count,
    } = req.body;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 10);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890";
    let couponCode = "";
    for (let i = 0; i < 8; i++) {
      couponCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    const existingCoupon = await referralModel.findOne({couponName}).select("couponName");
    if (existingCoupon) {
      return res.status(400).json({ error: "Coupon name already exists" });
    }
    const referral = await referralModel.create({
      couponName,
      couponCode,
      type,
      expirationDate,
      createdBy,
      discount,
      minOrderValue,
      maxOrderValue,
      count,
    });
    // console.log(referral,"Hit====");
    return res.status(200).json({ message: "Coupon generated successfully", referral });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//applyCoupon//
const applyCoupon = async (req, res) => {
  try {
    const { couponId, userId, productId } = req.body;

    // Fetch user from database
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }

    // Fetch coupon from database
    const coupon = await referralModel.findById(couponId);
    if (!coupon || new Date() > coupon.expirationDate || coupon.count <= 0) {
      return res.status(400).json({ error: "Invalid coupon code or coupon expired" });
    }
    if (coupon.usedCount >= coupon.count) {
      return res.status(400).json({ error: "Coupon has been used maximum times and is expired" });
    }

    // Fetch product from database
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(400).json({ error: "Product Not Found" });
    }

    // Calculate discounted price
    const discountAmount = product.price * (coupon.discount / 100);
    const discountedPrice = product.price - discountAmount;

    // Create new order with discount details
    const newOrder = new orderModel({
      userId: userId,
      productId: productId,
      discountPrice: discountedPrice,
      couponId: couponId,
      price: product.price,
    });

    // Update coupon usage count
    coupon.usedCount += 1;

    // Update user's points (example: +50 points)
    user.points += 50;

    // Save changes in parallel
    await Promise.all([newOrder.save(), coupon.save(), user.save()]);

    // Respond with success message and discounted price
    return res.status(200).json({
      message: "Coupon applied successfully",
      discountPrice: discountedPrice,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  generateCoupon,
  applyCoupon,
};

// API endpoint to use a coupon
// const useCoupon = async (req, res) => {
//     try {
//         const { couponCode, userId } = req.body;
//         const coupon = await referralModel.findOne({ code: couponCode });
//         if (!coupon) {
//             return res.status(404).json({ error: 'Coupon not found' });
//         }
//         if (coupon.expirationDate < Date.now()) {
//             return res.status(400).json({ error: 'Coupon has expired' });
//         }
//         if (coupon.usedBy.includes(userId)) {
//             return res.status(400).json({ error: 'Coupon has already been used by this user' });
//         }
// coupon.usedBy.push(userId);
//         await coupon.save();
//         return res.status(200).json({ message: 'Coupon used successfully', coupon });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// const applyCoupon = async (req, res) => {
//     try {
//         const { couponId, userId } = req.body;
//         const coupon = await referralModel.findById(couponId);
//         console.log(coupon);
//         if (!coupon || new Date() > coupon.expirationDate) {
//             return res.status(400).json({ error: 'Invalid coupon code' });
//         }
// if (user.couponsUsed.includes(couponId)) {
//     return res.status(400).json({ error: 'Coupon is already used by the user' });
// }

//         // const applyUser = await userModel.findById(userId);
//         // if (!applyUser) {
//         //     return res.status(400).json({ error: 'Invalid user ID' });
//         // }
//         // const product = await productModel.findById(productId);
//         // if (!product) {
//         //     return res.status(400).json({ error: 'Invalid product ID' });
//         // }

//         return res.status(200).json({ message: 'Coupon applied successfully', discount });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// const isNewUser = async (userId) => {
//     try {
//         const user = await userModel.findById(userId);
//         // console.log(user);
//         if (!user) {
//             throw new Error('User not found');
//         }
//         const currentDate = new Date();
//         const userCreationDate = user.createdAt;
//         const timeDifference = currentDate.getTime() - userCreationDate.getTime();
//         const daysDifference = timeDifference / (1000 * 3600 * 24);
//         return daysDifference <= 30;
//     } catch (error) {
//         console.error('Error checking user:', error);
//         return false;
//     }
// };

//  if (coupon.sharedBy && coupon.sharedBy !== userId) {
//         const sharedByUser = await userModel.findById(coupon.sharedBy);
//         if (sharedByUser) {
//             sharedByUser.points += POINTS_FOR_REFERRAL;
//             await sharedByUser.save();
//         }
//     }

// const firstUserLoginIn = async (req, res) => {
//     try {
//         const { userId, productId } = req.body;
//         const user = await userModel.findById(userId);
//         if (!user) {
//             return res.status(400).json({ error: 'Invalid user ID' });
//         }
//         if (user.firstOrder) {
//             const product = await productModel.findById(productId);
//             if (!product) {
//                 return res.status(400).json({ error: 'Invalid product ID' });
//             }
//             const discountAmount = product.price * 0.20;
//             const discountedPrice = product.price - discountAmount;
//             const newOrder = new orderModel({
//                 userId: userId,
//                 productId: productId,
//                 discountPrice: discountedPrice,
//                 price: product.price,
//             });
//             await newOrder.save();
//             user.firstOrder = false;
//             await user.save();
//             return res.status(200).json({ message: 'First-time user discount applied successfully', discountPrice: discountedPrice });
//         } else {
//             return res.status(200).json({ message: 'Regular user order', discountPrice: 0 });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// const applyCouponForFirstOrder = async (req, res) => {
//     try {
//         const { userId,couponId,productId } = req.body;

//         const user = await userModel.findById(userId);
//         console.log(user,"hit===========");
//         if (!user || user.hasReceivedFirstOrderCoupon) {
//             return res.status(400).json({ error: 'User has already received a first-order coupon' });
//         }
//         const couponCode = generateCouponCode();
//         const coupon = await referralModel.findOne({ couponCode });
//         let updatedTotal = orderTotal;
//         if (coupon && new Date() <= coupon.expirationDate && orderTotal >= coupon.minOrderValue) {
//          updatedTotal = orderTotal - calculateDiscount(orderTotal, coupon.discount);
//         }
//         user.hasReceivedFirstOrderCoupon = true;
//         await user.save();
//         return res.status(200).json({ message: 'First-order coupon applied successfully', updatedTotal });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// function generateCouponCode() {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let couponCode = '';
//     const codeLength = 8;

//     for (let i = 0; i < codeLength; i++) {
//         const randomIndex = Math.floor(Math.random() * characters.length);
//         couponCode += characters.charAt(randomIndex);
//     }

//     return couponCode;
// }
// function calculateDiscount(Totalprice, discount) {
//     if (discount.includes('%')) {
//         return (Totalprice * parseFloat(discount.replace('%', ''))) / 100;
//     } else {
//         return parseFloat(discount);
//     }
// }

// module.exports = applyCouponForFirstOrder;

// const applyCoupon = async (req, res) => {
//     try {
//         const { couponId, userId, productId, shareCount } = req.body;

//         const user = await userModel.findById(userId);
//         if (!user) {
//             return res.status(400).json({ error: 'Invalid user ID' });
//         }

//         const coupon = await referralModel.findById(couponId);
//         if (!coupon || new Date() > coupon.expirationDate || coupon.count <= 0) {
//             return res.status(400).json({ error: 'Invalid coupon code or coupon expired' });
//         }

//         let discountAmount = 0;
//         let discountedPrice = 0;
//         if (coupon.type === 'festive') {
//             const oneWeekFromExpiration = new Date(coupon.expirationDate);
//             oneWeekFromExpiration.setDate(oneWeekFromExpiration.getDate() - 7);
//             if (new Date() > oneWeekFromExpiration) {
//                 return res.status(400).json({ error: 'Festive coupon expired' });
//             }
//             discountAmount = product.price * (coupon.discount / 100);
//             discountedPrice = product.price - discountAmount;
//         } else if (coupon.type === 'newUser') {
//             if (!user.firstOrder) {
//                 return res.status(400).json({ error: 'Coupon applicable only for new users' });
//             }
//             discountAmount = product.price * (coupon.discount / 100);
//             discountedPrice = product.price - discountAmount;
//         } else if (coupon.type === 'shareable') {
//             if (shareCount) {
//                 user.points += shareCount;
//                 coupon.count += shareCount;
//                 coupon.shareCount += shareCount;
//             }
//             discountAmount = product.price * (coupon.discount / 100);
//             discountedPrice = product.price - discountAmount;
//         } else if (coupon.type === 'multiuser') {
//             discountAmount = product.price * (coupon.discount / 100);
//             discountedPrice = product.price - discountAmount;
//         } else {
//             return res.status(400).json({ error: 'Unsupported coupon type' });
//         }

//         const newOrder = new orderModel({
//             userId: userId,
//             productId: productId,
//             discountPrice: discountedPrice,
//             couponId: couponId,
//             price: product.price,
//         });

//         coupon.usedCount += 1;
//         user.points += 50;

//         await Promise.all([newOrder.save(), coupon.save(), user.save()]);

//         return res.status(200).json({message:'Coupon applied successfully', discountPrice: discountedPrice });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
