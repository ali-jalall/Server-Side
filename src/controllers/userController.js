const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../../config');

/**
 * @functions Helper Functions for crud operations on this model 
 * @returns <Promise> All methods beolw returns a promise to be handled
 */

exports.findAllUsers = (req, res) => {
  User.find()
    .then(result => {
      if ( result ) {
        res.status(200).json({ result });
      } else {
        throw new Error('Couldn\'t find results');
      }
    })
    .catch(err => {
      res.status(204).json({ errMsg: err.message });
    })
};

exports.findUserById = (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id })
    .then(user => {
      if ( user ) {
        res.status(200).json({ user })
      } else {
        throw new Error('Couldn\'t find results');
      }
    })
    .catch(err => {
      console.log(err);
      res.json({ errMsg: err });
    })
};

exports.createUser = (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email })
  .then(data => {
    if ( data ) {
      res.status(200).json({
        msg: 'User already exist',
        data
      })
    } else {
      if ( password.length < 8 ) throw new Error('Password Must be more than 8 letters')
      if ( username.length <= 6 ) throw new Error('Username Must be more than 6 letters')
      password = bcrypt.hashSync(password, 8)
      return User.create({ username, email, password })
    }
  })
  .then(createdUser => {
    const token = jwt.sign({ id: createdUser.id }, config.secret, { expiresIn: 86400 });
    res.status(201).json({
      auth: true,
      msg: 'User Created!',
      username: createdUser.username,
      token
    })
  })
  .catch(err => {
    res.json({ errMsg: err.message })
  })
};

// exports.temp = (req, res) => {
//   let token = jwt.verify(req.body.token, config.secret)
// }

exports.login = (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if ( !user ) {
        throw new Error('Please Enter Valid Data');
      }
      let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
      if ( !isPasswordValid ) {
        return res.json({ auth: false, token: null });
      }
      let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
      res.status(200).json({ auth: true, token, username: user.username });
      res.end()
    })
    .catch(err => {
      res.json({ err: err.message })
    })
}

exports.findUserByIdAndUpdate = (req, res) => {
  User.findOne({ where: { id: req.body.id } })
    .then(user => {
      if ( user ) {
        return user.update(req.body.newData);
      } else {
        throw new Error('Couldn\'t find results');
      }
    })
    .then(updatedUser => {
      res.status(201).json({
        msg: 'User Updated Successfuly!',
        updatedUser
      });
    })
    .catch(err => {
      res.json({ errMsg: err.message });
    })
};


exports.findProductsForUser = (userId) => {};