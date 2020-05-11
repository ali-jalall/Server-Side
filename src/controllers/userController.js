const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config");

/**
 * @functions Helper Functions for crud operations on this model
 * @returns <Promise> All methods beolw returns a promise to be handled
 */

exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) throw new Error("Couldn't find results");
    res.status(200).json({ users });
  } catch (err) {
    res.status(204).json({ errMsg: err.message });
  }
};

exports.findUserById = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id });
    if (user) res.status(200).json({ user });
    throw new Error("Couldn't find results");
  } catch (err) {
    res.json({ errMsg: err.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({ email });
    if (user) throw new Error("User Already Exist!");
    if (password.length < 8)
      throw new Error("Password Must be more than 8 letters");
    if (username.length <= 6)
      throw new Error("Username Must be more than 6 letters");
    password = bcrypt.hashSync(password, 8);
    req.body.password = password;
    let newUser = await User.create(req.body);
    const token = jwt.sign({ id: newUser.id }, config.secret, {
      expiresIn: 86400,
    });
    res.status(201).json({
      auth: true,
      msg: "User Created!",
      username: newUser.username,
      user_id: newUser.id,
      token,
    });
  } catch (err) {
    res.json({ errMsg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    let email = req.body.email;
    let user = await User.findOne({ email });
    if (!user) throw new Error("Please Enter Valid Data");
    let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) return res.json({ auth: false, token: null });
    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400,
    });
    res.status(200).json({
      auth: true,
      token,
      username: user.username,
      user_id: user._id,
    });
  } catch (err) {
    res.json({ err: err.message });
  }
};

exports.findUserByIdAndUpdate = s = async (req, res) => {
  try {
    const userupdated = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({ userupdated });
  } catch (err) {
    res.json({ err: err.message });
  }
};

exports.findUserByIdAndDelete = async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new Error("No User With this id!");
    res.status(201).json({ deleted: true });
  } catch (err) {
    res.json({ errMsg: err.message });
  }
};

exports.findProductsAndOrdersByUser = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id })
      .populate("products_bought")
      .populate("orders")
      .exec();
    res.json({
      user,
      products: user.products_bought,
      orders: user.orders,
    });
  } catch (err) {
    res.json({ errMsg: err.message });
  }
};
