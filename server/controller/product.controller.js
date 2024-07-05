const productModel = require('../model/product.model')
// const Category = require('../model/category.model')
// const GlobalDiscount = require("../model/globalDiscount.model");
// const NewUserDiscount = require("../model/newUserDiscount.model")
function generateRandomDiscount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createProduct = async (req, res) => {
  try {
      const { name, description, price, categoryId, subcategoryId, companyName } = req.body;
      const image = req.file;
      const imageName = image ? image.originalname : null;
      const mobileSubcategoryId = '668680c4aa3e5610e05ff0cc';
      let discount = 0;
      if (subcategoryId === mobileSubcategoryId) {
          discount = generateRandomDiscount(20, 95);
      }
      const discountedPrice = price - (price * (discount / 100));

      const newProduct = new productModel({ 
          name, 
          description, 
          price, 
          categoryId, 
          subcategoryId, 
          companyName, 
          discount, 
          image: imageName,
          discountedPrice
      });
      await newProduct.save();
      return res.status(201).json({ status: 201, message: "Product added successfully", data: newProduct });
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ status: 500, message: error.message });
  }
};


const getAllProducts = async (req, res) => {
  try {
      const { status } = req.query;
      const isActive = status ? status === 'true' : null;

      if (isActive === true) {
          const productActive = await productModel.find({ status: true }).sort({ createdAt: -1 });
          const totalItems = await productModel.countDocuments({ status: true });
          return res.status(200).json({ status: 200, message: "Active products", response: productActive, totalItems });
      } else if (isActive === false) {
          const productInactive = await productModel.find({ status: false }).sort({ createdAt: -1 });
        const totalItems = await productModel.countDocuments({ status: false });
          return res.status(200).json({ status: 200, message: "Inactive products", response: productInactive, totalItems });
      } else {
          const products = await productModel.find().sort({ createdAt: -1 });
       const totalItems = await productModel.countDocuments();
          return res.status(200).json({ status: 200, message: "Products data fetched successfully", response: products, totalItems });
      }
  } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
  };
};

const getOneProduct = async(req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }
    return res.status(200).json({ status: 200, message: "Product retrieved successfully", response: product });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 500, message: error.message });
  }
}
const getProductsBySubcategory = async (req, res) => {
  try {
    // console.log('Query Params:', req.query); 
      const { categoryId, subcategoryId } = req.query;
      // console.log('categoryId:', categoryId);
// console.log('subcategoryId:', subcategoryId);

      const products = await productModel.find({
          categoryId,
          subcategoryId
      });
      return res.status(200).json({ status: 200, products });
  } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
  }
};



const deleteProduct = async(req, res)=>{
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ status: 200, message: "Product deleted successfully", response: product });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 500, message: error.message });
  }
}






module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct,
    getOneProduct,
    getProductsBySubcategory
};
