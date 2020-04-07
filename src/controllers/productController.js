const Product = require("../models/Product");
const Category = require("../models/Category");

/**
 * @functions Helper Functions for crud operations on this model
 * @returns <Promise> All methods beolw returns a promise to be handled
 */

exports.findAllProducts = (req, res) => {
  Product.find()
    .then((result) => {
      if (result) {
        res.status(200).json({ result });
      } else {
        throw new Error("Couldn't find results");
      }
    })
    .catch((err) => {
      res.status(204).json({ err });
    });
};

exports.findProductById = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => {
      if (product) {
        res.status(200).json({ product });
      } else {
        throw new Error("Couldn't find results");
      }
    })
    .catch((err) => {
      res.status(204).json({ errMsg: err.message });
    });
};

exports.addProduct = (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (product) {
        return Category.update(
          { name: req.body.category },
          {
            $push: { products: product._id },
          }
        );
      }
    })
    .then(done => {
      res.status(201).json({
        msg: "Product Added!"
      });
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.findProductByIdAndDelete = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(product => {
      return Category.update({ name: product.category }, {
        $pull: { products: product.id }
      })
    })
    .then(result => {
      res.json({ deleted: true })
    })
    .catch(err => {
      res.json({ errMsg: err.message });
    });
};

exports.findProductByIdAndUpdate = (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.findProductsByCategory = (req, res) => {
  Product.find({ category: req.params.category })
    .then((products) => {
      if (products.length !== 0) {
        res.json({ products });
      } else {
        throw new Error("No Products for this category!");
      }
    })
    .catch((err) => {
      res.status(404).json({ errMsg: err.message });
    });
};

// Done
