const express = require('express');
const router = express.Router();

const order_controller = require('../controllers/orderController');

router.route('/')
  .get(order_controller.findAllOrders)

router.route('/add')
  .post(order_controller.addOrder)
  

router.route('/:id')
  .get(order_controller.findOrderById)
  .delete(order_controller.findOrderByIdAndDelete)
  

module.exports = router;