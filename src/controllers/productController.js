const Product = require("../models/Product");
const Category = require("../models/Category");
const uploadToCloudinary = require("../uploads/index").uploadToCloudinary;

/**
 * @functions Helper Functions for crud operations on this model
 * @returns <Promise> All methods beolw returns a promise to be handled
 */

exports.findAllProducts = async (req, res) => {
  try {
    let result = await Product.find();
    if (!result.length) throw new Error("Couldn't find results");
    res.status(200).json({ result });
  } catch (err) {
    res.status(204).json({ err });
  }
};

exports.findProductById = (req, res) => {
  try {
    let product = Product.findOne({ _id: req.params.id });
    if (product) res.status(200).json({ product });
    else throw new Error("Couldn't find results");
  } catch (err) {
    res.status(204).json({ errMsg: err.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    let arrOfPhotos = [];
    for (let file of req.files) {
      let { secure_url } = await uploadToCloudinary(file);
      arrOfPhotos.push(secure_url);
    }
    let product = await Product.create(req.body);
    await Product.updateOne(
      { _id: product._id },
      { $push: { product_imgs: { $each: arrOfPhotos } } }
    );
    await Category.updateOne(
      { name: req.body.category },
      {
        $push: { products: product._id },
      }
    );
    res.status(201).json({
      msg: "Product Added!",
      product,
    });
  } catch (err) {
    res.json({ errMsg: err.message });
  }
};

exports.findProductByIdAndDelete = async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    await Category.update(
      { name: product.category },
      {
        $pull: { products: product.id },
      }
    );
    res.json({ deleted: true });
  } catch (err) {
    res.json({ errMsg: err.message });
  }
};

exports.findProductByIdAndUpdate = async (req, res) => {
  try {
    let result = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({ result });
  } catch (err) {
    res.json({ errMsg: err.message });
  }
};

exports.findProductsByCategory = async (req, res) => {
  try {
    let products = await Product.find({ category: req.params.category });
    if (!products.length) throw new Error("No Products");
    res.json({ products });
  } catch (err) {
    res.json({ errMsg: err.message });
  }
};

// exports.deleteAllProducts = async (req, res) => {
//   Product.remove()
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// };

// Done
