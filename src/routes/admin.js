const express = require('express');
const router = express.Router();

const admin_controller = require('../controllers/adminController');

router.route('/')
  .get(admin_controller.findAllAdmins)

router.route('/add')
  .post(admin_controller.addAdmin)


router.route('/login')
  .post(admin_controller.adminLogin)


router.route('/:id')
  .get(admin_controller.getAdminbyId)


module.exports = router;