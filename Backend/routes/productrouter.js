const express = require('express');
const router = express.Router();
const { auth, isAuth } = require('../middelwares/authmiddlewar');
const {
  addProduct,
  getProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct
} = require('../controllers/productcontroller');

// Admin only routes
router.post('/add', auth,  addProduct);
router.put('/update/:id', auth,  updateProduct);
router.delete('/delete/:id', auth,  deleteProduct);

// Public / Staff routes
router.get('/all', isAuth, getProducts);
router.get('/category/:category', isAuth, getProductsByCategory);

module.exports = router;
