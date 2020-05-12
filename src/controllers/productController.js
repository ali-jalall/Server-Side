const Product = require("../models/Product");
const Category = require("../models/Category");
const uploadToCloudinary = require('../uploads/index').uploadToCloudinary

/**
 * @functions Helper Functions for crud operations on this model
 * @returns <Promise> All methods beolw returns a promise to be handled
 */

exports.findAllProducts = (req, res) => {
  Product.find()
    .then((result) => {
      if (!result.length) throw new Error("Couldn't find results");
      res.status(200).json({ result });
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



exports.addProduct = async (req, res) => {
  let arrOfPhotos = [];
  let product_id = null;
  try {
    for (let file of req.files) {
      let { secure_url } = await uploadToCloudinary(file);
      arrOfPhotos.push(secure_url);
    }
    Product.create(req.body)
      .then((product) => {
        product_id = product._id;
        return Product.updateOne(
          { _id: product._id },
          { $push: { product_imgs: { $each: arrOfPhotos } } }
        );
      })
      .then((product) => {
        if (product) {
          return Category.updateOne(
            { name: req.body.category },
            {
              $push: { products: product_id },
            }
          );
        }
      })
      .then((done) => {
        res.status(201).json({
          msg: "Product Added!",
          done,
        });
      })
      .catch((err) => {
        res.json({ errMsg: err.message });
      });
  } catch (err) {
    console.log(err);
  }
};

exports.findProductByIdAndDelete = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      return Category.update(
        { name: product.category },
        {
          $pull: { products: product.id },
        }
      );
    })
    .then(() => {
      res.json({ deleted: true });
    })
    .catch((err) => {
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
      if (!products.length) throw new Error('No Products')
      res.json({ products });
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.deleteAllProducts = (req, res) => {
  Product.remove()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
};

// Done
