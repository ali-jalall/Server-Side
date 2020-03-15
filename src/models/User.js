const Sequelize = require('sequelize');

module.exports = Sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  }
})