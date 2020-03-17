const Sequelize = require('sequelize');
const sequelize = require('../database/connection')

const User = sequelize.define('User', {
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
    type: Sequelize.STRING(8),
    allowNull: false,
    validate: {
      len: {
        args: [8, 16],
        msg: 'Password Must be More than 8 letters!'
      }
    }
  },
  productsId: {
    type: Sequelize.STRING,
    get () {
      return this.getDataValue('productsId').split(';');
    },
    set (val) {
      this.setDataValue('productsId', val.join(';'));
    }
  }
});

/**
 * @functions Helper Functions for crud operations on this model 
 * @returns <Promise> All methods beolw returns a promise to be handled
 */

module.exports = findAllUsers = () => {
  return User.findAll();
};

module.exports = findUserById = id => {
  return User.findOne({
    where: { id }
  });
};

module.exports = createUser = userInfo => {
  return User.findOrCreate({ where: userInfo })
};

module.exports = findUserByIdAndUpdate = (id, newData) => {
  return User.findOne({ where: { id } })
    .then(user => {
      if ( user ) {
        return user.update(newData);
      }
    })
};

/**
 * TODO: Finish implmenting findProductsForUser
 */

 module.exports = findProductsForUser = (userId) => {};