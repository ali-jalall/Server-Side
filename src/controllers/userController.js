const User = require('../models/User');

/**
 * @functions Helper Functions for crud operations on this model 
 * @returns <Promise> All methods beolw returns a promise to be handled
 */

exports.findAllUsers = (req, res) => {
  User.findAll()
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
  User.findOne({ where: { id } })
    .then(user => {
      if ( user ) {
        res.status(200).json({ user })
      } else {
        throw new Error('Couldn\'t find results');
      }
    })
    .catch(err => {
      res.json({ errMsg: err.message });
    })
};

exports.createUser = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(data => {
    if ( data ) {
      res.status(200).json({
        msg: 'User already exist',
        data
      })
    } else {
      return User.create(req.body)
    }
  })
  .then(createdUser => {
    res.status(201).json({
      msg: 'User Created!',
      createdUser
    })
  })
  .catch(err => {
    res.json({ err })
  })
};

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