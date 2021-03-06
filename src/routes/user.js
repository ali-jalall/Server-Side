const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

router.route('/')
  .get(user_controller.findAllUsers)

router.route('/add')
  .post(user_controller.addUser)

router.route('/login')
  .post(user_controller.login)

// router.route('/temp')
//   .post(user_controller.temp)

router.route('/:id')
  .get(user_controller.findUserById)
  .put(user_controller.findProductsAndOrdersByUser)
  .patch(user_controller.findUserByIdAndUpdate)
  .delete(user_controller.findUserByIdAndDelete)

module.exports = router;