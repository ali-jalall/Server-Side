const Category = require("../models/Category");

exports.findAllCategories = (req, res) => {
  Category.find()
    .then((categories) => {
      if (!categories.length) throw new Error("No Categories!");
      res.json({ categories });
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.addCategory = (req, res) => {
  console.log(req.body);
  Category.findOne({ name: req.body.name })
    .then((category) => {
      if (category) throw new Error("Category already exist");
      return Category.create(req.body);
    })
    .then((newCategory) => {
      res.status(201).json({
        msg: "Category Added",
        newCategory,
      });
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.findCategoryByIdAndDelete = (req, res) => {
  Category.findByIdAndDelete(req.params.id).then(() => {
    res.json({ deleted: true });
  });
};

exports.findProductsByCategory = (req, res) => {
  Category.findOne({ _id: req.params.id })
    .populate("products")
    .exec((err, { products }) => {
      if (err) res.json({ errMsg: err.message });
      res.status(200).json({ products });
    });
};

exports.deleteAllCategories = (req, res) => {
  Category.remove()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => console.log(err));
};
