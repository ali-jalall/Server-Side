const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config");

/**
 * @functions Helper Functions for crud operations on this model
 * @returns <Promise> All methods beolw returns a promise to be handled
 */

exports.findAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      if (!users.length) throw new Error("Couldn't find results");
      res.status(200).json({ users });
    })
    .catch((err) => {
      res.status(204).json({ errMsg: err.message });
    });
};

exports.findUserById = (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id })
    .then((user) => {
      if (user) {
        res.status(200).json({ user });
      } else {
        throw new Error("Couldn't find results");
      }
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.addUser = (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body);
  User.findOne({ email })
    .then((data) => {
      if (data) {
        throw new Error("User Already Exist!");
      } else {
        if (password.length < 8)
          throw new Error("Password Must be more than 8 letters");
        if (username.length <= 6)
          throw new Error("Username Must be more than 6 letters");
        password = bcrypt.hashSync(password, 8);
        req.body.password = password;
        return User.create(req.body);
      }
    })
    .then((createdUser) => {
      const token = jwt.sign({ id: createdUser.id }, config.secret, {
        expiresIn: 86400,
      });
      res.status(201).json({
        auth: true,
        msg: "User Created!",
        username: createdUser.username,
        user_id: createdUser.id,
        token,
      });
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        throw new Error("Please Enter Valid Data");
      }
      let isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        return res.json({ auth: false, token: null });
      }
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });
      res.status(200).json({
        auth: true,
        token,
        username: user.username,
        user_id: user._id,
      });
      res.end();
    })
    .catch((err) => {
      res.json({ err: err.message });
    });
};

exports.findUserByIdAndUpdate = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((userupdated) => {
      res.status(201).json({ userupdated });
    })
    .catch((err) => {
      res.json({ err: err.message });
    });
};

exports.findUserByIdAndDelete = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) throw new Error("No User With this id!");
      res.status(201).json({ deleted: true });
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.findProductsAndOrdersByUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate("products_bought")
    .populate("orders")
    .exec()
    .then((user) => {
      res.json({
        user,
        products: user.products_bought,
        orders: user.orders,
      });
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};
