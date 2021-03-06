const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is Required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is Required"]
  }
});

module.exports = new mongoose.model("Admin", adminSchema);


// const Sequelize = require('sequelize');
// const sequelize = require('../database/connection');

// module.exports = sequelize.define('Admin', {
//   id: {
//     type: Sequelize.INTEGER(11),
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   username: {
//     type: Sequelize.STRING(8),
//     allowNull: false,
//     unique: true,
//     validate: {
//       len: {
//         args: [6, 18],
//         msg: 'Username Must be more than 6 letters!'
//       }
//     }
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: {
//         args: true,
//         msg: 'Please Enter Valid email!'
//       }
//     }
//   },
//   password: {
//     type: Sequelize.STRING(8),
//     allowNull: false,
//     validate: {
//       len: {
//         args: [8, 16],
//         msg: 'Password Must be More than 8 letters!'
//       }
//     }
//   },
// });