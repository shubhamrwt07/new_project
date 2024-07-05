const categoryModel = require("../model/category.model");
const productModel = require("../model/product.model");


const addCategory = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, status, subcategories } = req.body;
        // if (!name || typeof status !== 'boolean') {
        //     return res.status(400).json({ status: 400, message: "Name and status are required" });
        // }
        // if (subcategories && !Array.isArray(subcategories)) {
        //     return res.status(400).json({ status: 400, message: "Subcategories must be an array" });
        // }
        const category = await categoryModel.create({ name, status, subcategories });
        return res.status(200).json({ status: 200, message: "Category added successfully", response: category });
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    }
};
const getAllCategories = async (req, res) => {
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

const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.query;
        const productList = await productModel.find({ categoryId }).populate('categoryId').sort({ createdAt: -1 })
        const totalItems = await productModel.countDocuments({ categoryId });
        return res.status(200).json({ status: 200, message: "Products of this category fetched successfully", response: productList, totalItems })
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    };
};


module.exports = {
    addCategory,
    getAllCategories,
    getProductsByCategory,
}