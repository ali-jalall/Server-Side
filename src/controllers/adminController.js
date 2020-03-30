const Admin = require('../models/Admin');

exports.addAdmin = (req, res) => {
  const email = req.body.email;
  Admin.findOne({ email })
  .then(admin => {
    if ( admin ) {
      res.status(200).json({
        msg: 'Admin Already exist',
        admin
      });
    } else {
      return Admin.create(req.body);
    }
  })
  .then(newAdmin => {
    res.status(201).json({
      msg: 'Admin Added',
      newAdmin
    })
  })
  .catch(err => {
    res.json({ errMsg: err.message })
  })
}

exports.getAdmins = (req, res) => {
  Admin.find()
    .then(admins => {
      if ( admins ) {
        res.json({ admins })
      } else {
        throw new Error('No Admins!')
      }
    })
    .catch(err => {
      res.json({ errMsg: err.message })
    })
}
