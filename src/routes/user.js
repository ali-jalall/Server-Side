const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

router.route('/')
  .get(user_controller.findAllUsers)

router.route('/add')
  .post(user_controller.createUser)

router.route('/login')
  .post(user_controller.login)

router.route('/:id')
  .get(user_controller.findUserById)
  .patch(user_controller.findUserByIdAndUpdate)

module.exports = router;