const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is Required!'],
  },
  username: {
    type: String,
    ref: 'User',
    required: [true, 'User name is Required!']
  },
  products_ids:
  [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  total_price: {
    type: Number,
    required: [true, 'Price is Required!']
  },
  status: {
    type: String,
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = new mongoose.model("Order", orderSchema);
module.exports = Order;
