const Admin = require('../models/Admin');

exports.addAdmin = adminData => {
  return Admin.findOrCreate(adminData);
}