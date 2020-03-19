const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/productController');

router.route('/')
  .get(product_controller.findAllProducts)

router.route('/add')
  .post(product_controller.addProduct)
  
router.route('/edit')
  .patch(product_controller.findProductByIdAndUpdate)

router.route('/p/:id')
  .get(product_controller.findProductById)

router.route('/:category')
  .get(product_controller.findProductsByCategory)

module.exports = router;