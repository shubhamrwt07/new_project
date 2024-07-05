const jwt = require('jsonwebtoken');
const referralModel = require('../model/refferral.model');
require('dotenv').config();


// Access Token
const accessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            _id: userId._id,
        };
        const options = {
            issuer: "VENUS",
            expiresIn: '12h',
        };
        const secret = process.env.SECRET_ACCESS_TOKEN;
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}


// verify Token
const verifyToken = async (req, res, next) => {
    try {
        const headerToken = req.headers['authorization'];
        if (!headerToken || headerToken === undefined) {
            return res.status(401).json({ message: 'JWT token is required' });
        }
        const bearerToken = headerToken.split(' ');
        const token = bearerToken[1];
        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, async (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'JWT token is expired or invalid' });
            }
            const { _id } = user;
            req.user = { _id };
            next();
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//deleteExpireCoupons//
// const deleteExpiredCoupons = async (req, res, next) => {
//     try {
//         await referralModel.deleteMany({ 
//             $or: [
//                 { expirationDate: { $lte: new Date() } },
//                 { $expr: { $gte: ["$usedCount", "$count"] } } 
//             ]
//         });
//         next();
//     } catch (error) {
//         console.error('Error deleting expired or overused coupons:', error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

module.exports = {
    accessToken,
    verifyToken,
    // deleteExpiredCoupons
};