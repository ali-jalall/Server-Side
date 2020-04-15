const express = require('express');
const router = express.Router();

const order_controller = require('../controllers/orderController');

router.route('/')
  .get(order_controller.findAllOrders)

router.route('/add')
  .post(order_controller.addOrder)
  

router.route('/:id')
  .post(order_controller.findProductsByOrder)
  .put(order_controller.findUserByOrder)
  .patch(order_controller.removeProductFromOrder)
  .get(order_controller.findOrderById)
  .delete(order_controller.findOrderByIdAndDelete)
  
router.route('/edit')
  .put(order_controller.findOrderByIdAndUpdate)
module.exports = router;