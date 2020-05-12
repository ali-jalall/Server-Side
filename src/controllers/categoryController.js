const Category = require("../models/Category");

exports.findAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories.length) throw new Error("No Categories!");
    res.json({ categories });
  } catch (err) {
    res.json({ errMsg: err.message });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.body.name });
    if (category) throw new Error("Category already exist");
    await Category.create(req.body);
    res.status(201).json({
      msg: "Category Added",
    });
  } catch (err) {
    res.json({ errMsg: err.message });
  }
};

exports.findCategoryByIdAndDelete = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ deleted: true });
  } catch (err) {
    res.json({ errMsg: err.message });
  }
};
exports.findProductsByCategory = async (req, res) => {
  try {
    const { products } = await Category.findOne({ _id: req.params.id })
      .populate("products")
      .exec();
    res.status(200).json({ products });
  } catch (err) {
    res.json({ errMsg: err.message });
  }
};

// exports.deleteAllCategories = (req, res) => {
//   Category.remove()
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => console.log(err));
// };
