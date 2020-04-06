const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name is Required"],
    trim: true,
  },
  size: {
    type: String,
    default: "N/A",
  },
  details: {
    type: String,
    required: [true, "Password is Required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is Required"],
  },
  price: {
    type: Number,
    required: [true, "Price is Required"],
  },
  product_imgs:
  [
    {
      type: String,
      required: [true, "Product Img is Required"],
    },
  ],
  type: {
    type: String,
    default: 'N/A'
  },
  length: {
    type: String,
    default: 'N/A'
  },
  surface_styling: {
    type: String,
    default: 'N/A'
  },
  pattern_type: {
    type: String,
    default: 'N/A'
  },
  hemline: {
    type: String,
    default: 'N/A'
  },
  knit_woven: {
    type: String,
    default: 'N/A'
  },
  closure: {
    type: String,
    default: 'N/A'
  },
  transparency: {
    type: String,
    default: 'N/A'
  },
  occasion: {
    type: String,
    default: 'N/A'
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = new mongoose.model("Product", productSchema);
module.exports = Product;
