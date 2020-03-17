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
      if (product) {
        res.status(200).json({ product })
      } else {
        throw new Error('Couldn\'t find results');
      }
    })
    .catch(err => {
      res.status(204).json({ err });
    })
};

exports.addProduct = (req, res) => {
  Product.create(req.body.productInfo)
    .then(product => {
      if ( product ) {
        res.status(201).json({ 
          msg: 'Product Added!',
          product 
        });
      }
    })
    .catch(err => {
      res.status(204).json({ err });
    })
};

exports.findProductByIdAndUpdate = (req, res) => {
  Product.findOne({ where: { id: req.body.id } })
    .then(product => {
      if ( product ) {
        return Product.update(req.body.newData)
      } else {
        throw new Error('Error while Updating ...')
      }
    })
    .then(updatedProduct => {
      res.status(200).json({
        msg: 'Product updated successfuly!',
        updatedProduct
      });
    })
    .catch(err => {
      res.json({ err });
    })
};

exports.findProductsByCategory = (req, res) => {
  Product.findAll({ where: { category: req.body.category }})
    .then(products => {
      if ( products ) {
        res.json({ products })
      } else {
        throw new Error('No Products for this category!');
      }
    })
    .catch(err => {
      res.json({ err })
    })
};