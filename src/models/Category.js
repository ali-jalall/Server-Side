const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category Name is Required"],
  },
  products:
  [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Category = new mongoose.model("Category", categorySchema);
module.exports = Category;
