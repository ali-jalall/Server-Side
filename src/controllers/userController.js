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
      res.status(204).json({ err });
    })
};

exports.findUserById = (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => {
      if (user) {
        res.status(200).json({ user })
      } else {
        throw new Error('Couldn\'t find results');
      }
    })
    .catch(err => {
      res.status(204).json({ err });
    })
};

exports.createUser = (req, res) => {
  console.log(req.body)
    User.findOrCreate({ where: {
      username: req.body.username,
      password: req.body.password,
    }})
      .then((user, created) => {
        console.log(user)
        res.json({ user })
        // if ( created ) {
        //   res.status(201).json({
        //     msg: 'User added successfuly!',
        //     user
        //   });
        // } else {
        //   throw new Error('User already exist!')
        // }
      }, (error) => {
        res.json(error);
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
      res.json({ err });
    })
};

/**
 * TODO: Finish implmenting findProductsForUser
 */

exports.findProductsForUser = (userId) => {};