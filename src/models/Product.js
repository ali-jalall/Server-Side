const Sequelize = require('sequelize');

const Product = sequelize.define('Product', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [1, 100],
        msg: 'Name of Product Cannot be empty!'
      }
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [1, 1000],
        msg: 'Description Cannot be empty!'
      }
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: 1,
        msg: 'Price Can not be 0!'
      }
    }
  }
});


/**
 * @functions Helper Functions for crud operations on this model 
 * @returns <Promise> All methods beolw returns a promise to be handled
 */

module.exports = findAllProducts = () => {
  return Product.findAll();
};

module.exports = findProductById = id => {
  return Product.findOne({
    where: { id }
  });
};

module.exports = addProduct = productInfo => {
  return Product.findOrCreate({ where: productInfo })
};

module.exports = findProductByIdAndUpdate = (id, newData) => {
  return Product.findOne({ where: { id } })
    .then(product => {
      if ( product ) {
        return Product.update(newData);
      }
    })
};