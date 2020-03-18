const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/productController');

router.route('/')
  .get(product_controller.findAllProducts)

router.route('/add')
  .post(product_controller.addProduct)

router.route('/:id')
  .get(product_controller.findProductById)
  .patch(product_controller.findProductByIdAndUpdate)

router.route('/:category')
  .get(product_controller.findProductsByCategory)

module.exports = router;