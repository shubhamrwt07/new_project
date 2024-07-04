const categoryModel = require("../model/category.model");
const productModel = require("../model/product.model");


exports.addCategory = async (req, res) => {
    try {
        const { name, status } = req.body;
        const category = await categoryModel.create({ name, status })
        return res.status(200).json({ status: 200, message: "Category added successfully", response: category });
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    };
};
exports.getAllCategories = async (req, res) => {
    try {
        const { status } = req.query;
        let query = {};

        if (status === undefined) {
            query.status = true; 
        } else {
            query.status = status === 'true'; 
        }

        const categories = await categoryModel.find(query).sort({ createdAt: -1 });
        const totalItems = await categoryModel.countDocuments(query);
        return res.status(200).json({ status: 200, message: "Categories data fetched successfully", response: categories, totalItems });
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    };
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.query;
        const productList = await productModel.find({ categoryId }).populate('categoryId').sort({ createdAt: -1 })
        const totalItems = await productModel.countDocuments({ categoryId });
        return res.status(200).json({ status: 200, message: "Products of this category fetched successfully", response: productList, totalItems })
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    };
};
