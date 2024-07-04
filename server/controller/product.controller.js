const productModel = require('../model/product.model')

const createProduct = async (req, res) => {
    try {
      console.log('Request Body:', req.body);
      console.log('Request Files:', req.file );
      
      const { name,description,price,categoryId } = req.body;
      const image = req.file;  
      const existingProduct = await productModel.findOne({ name });
      if (existingProduct) {
        return res.status(400).json({ status: 400, message: "Product with the same name already exists" });
      }
  
      const imageNames = image.originalname;
      const result = await productModel.create({ name,description,price,categoryId , image: imageNames });
      return res.status(200).json({ status: 200, message: "Product added successfully", response: result });
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
    getOneProduct
};
