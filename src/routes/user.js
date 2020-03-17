const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

// router.get('/', user_controller.findAllUsers);

// router.post('/', user_controller.createUser);

router.route('/add')
  .post(user_controller.createUser)

module.exports = router;