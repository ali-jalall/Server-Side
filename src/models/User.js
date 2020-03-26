const Sequelize = require('sequelize');
const sequelize = require('../database/connection')

module.exports = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(8),
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [6, 18],
        msg: 'Username Must be more than 6 letters!'
      }
    }
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      min:{
        args:[4],
        msg:" Minimum 4 characters required in last name"
      }
    }
  },
  // productsId: {
  //   type: Sequelize.STRING,
  //   get () {
  //     return this.getDataValue('productsId').split(';');
  //   },
  //   set (val) {
  //     this.setDataValue('productsId', val.join(';'));
  //   }
  // }
});