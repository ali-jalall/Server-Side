const express = require('express');
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const product_controller = require('../controllers/productController');

router.route('/')
  .get(product_controller.findAllProducts)

router.route('/add')
  .post(upload.array("image"), product_controller.addProduct)

router.route('/p/:id')
  .get(product_controller.findProductById)
  .put(product_controller.findProductByIdAndUpdate)
  .delete(product_controller.findProductByIdAndDelete)

router.route('/:category')
  .get(product_controller.findProductsByCategory)

router.route('/delete')
  .delete(product_controller.deleteAllProducts)
module.exports = router;