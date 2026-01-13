const Product=require('../models/productmodel')

// Add Product (Admin only)
const addProduct = async (req, res) => {
  try {
    const { pname, price, category, stock } = req.body;

    const product = await Product.create({ pname, price, category, stock });
    res.status(201).json({ message: "Product added", product });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Products by Category
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Product (Admin only)
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Product updated", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Product (Admin only)
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports={addProduct,updateProduct,deleteProduct,getProductsByCategory,getProducts}