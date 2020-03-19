const Product = require('../models/Product');

/**
 * @functions Helper Functions for crud operations on this model 
 * @returns <Promise> All methods beolw returns a promise to be handled
 */

exports.findAllProducts = (req, res) => {
  Product.findAll()
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

exports.findProductById = (req, res) => {
  Product.findOne({ where: { id: req.params.id } })
    .then(product => {
      if ( product ) {
        res.status(200).json({ product })
      } else {
        throw new Error('Couldn\'t find results');
      }
    })
    .catch(err => {
      res.json({ errMsg: err.message });
    })
};

exports.addProduct = (req, res) => {
  Product.create(req.body)
    .then(product => {
      if ( product ) {
        res.status(201).json({ 
          msg: 'Product Added!',
          product 
        });
      }
    })
    .catch(err => {
      res.json({ errMsg: err });
    })
};

exports.findProductByIdAndUpdate = (req, res) => {
  const id = req.body.id;
  const newData = req.body.newData;
  Product.findOne({ where: { id } })
    .then(product => {
      if ( product ) {
        if ( newData ) {
          product.update(req.body.newData)
        } else {
          throw new Error('No Content Provided');
        }
      } else {
        throw new Error('No product With this id');
      }
    })
    .then(updatedProduct => {
      res.status(200).json({
        msg: 'Product updated successfuly!',
        updatedProduct
      });
    })
    .catch(err => {
      res.status(404).json({ errMsg: err.message });
    })
};

exports.findProductsByCategory = (req, res) => {
  Product.findAll({ where: { category: req.params.category }})
    .then(products => {
      if ( products.length !== 0 ) {
        res.json({ products })
      } else {
        throw new Error('No Products for this category!');
      }
    })
    .catch(err => {
      res.status(404).json({ errMsg: err.message })
    })
};

// Done