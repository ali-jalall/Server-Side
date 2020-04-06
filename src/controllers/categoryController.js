const Category = require("../models/Category");

exports.findAllCategories = (req, res) => {
  Category.find()
    .then((categories) => {
      if (categories) {
        res.json({ categories });
      } else {
        throw new Error("No Categories!");
      }
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};
