const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  pname: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // Bakery, Fast Food, etc.
  stock: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
