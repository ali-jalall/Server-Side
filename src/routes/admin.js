const express = require('express');
const router = express.Router();

const admin_controller = require('../controllers/adminController');

router.route('/')
  .get(admin_controller.getAdmins)

router.route('/add')
  .post(admin_controller.addAdmin)


module.exports = router;