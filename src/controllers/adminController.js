const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config");

exports.addAdmin = (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  if (!email || !password || !username) {
    res.json({ errMsg: "Please Fill all the data!" });
  }
  Admin.findOne({ email })
    .then((admin) => {
      if (admin) {
        res.status(200).json({
          msg: "Admin Already exist",
          admin,
        });
      } else {
        if (password.length < 8)
          throw new Error("Password Must be more than 8 letters");
        if (username.length <= 6)
          throw new Error("Username Must be more than 6 letters");
        password = bcrypt.hashSync(password, 8);
        return Admin.create({ username, email, password });
      }
    })
    .then((newAdmin) => {
      res.status(201).json({
        msg: "Admin Added",
        newAdmin,
      });
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.adminLogin = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  Admin.findOne({ email })
    .then((admin) => {
      if (!admin) {
        throw new Error("Please Enter Valid Data!");
      }
      let isPasswordValid = bcrypt.compareSync(password, admin.password);
      if (!isPasswordValid) res.json({ auth: false, token: null });
      let token = jwt.sign({ id: admin.id }, config.secret, {
        expiresIn: 86400,
      });
      res.json({
        auth: true,
        admin: admin.username,
        token,
      });
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.findAllAdmins = (req, res) => {
  Admin.find()
    .then((admins) => {
      if (!admins.length) throw new Error("No Admins!");
      res.json({ admins });
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.getAdminbyId = (req, res) => {
  Admin.findOne({ _id: req.params.id })
    .then((admin) => {
      if (admin) {
        res.json({ admin });
      } else {
        throw new Error("No Admin!");
      }
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};
