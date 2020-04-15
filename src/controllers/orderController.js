const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

exports.findAllOrders = (req, res) => {
  Order.find()
    .then((orders) => {
      if (orders.length === 0) throw new Error("No Orders Yet!");
      res.json({ orders });
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.findOrderById = (req, res) => {
  Order.findOne({ _id: req.params.id })
    .then((order) => {
      if (!order) throw new Error("No product!");
      res.json({ order });
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.addOrder = (req, res) => {
  console.log(req.body)
  User.updateOne(
    { _id: req.body.user_id },
    { $push: { products_bought: { $each: req.body.products_ids } } }
  )
    .then(() => {
      return Order.create(req.body);
    })
    .then((order) => {
      return User.updateOne(
        { _id: req.body.user_id },
        { $push: { orders: order._id } }
      );
    })
    .then(() => {
      res.status(201).json({
        created: true
      })
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.findOrderByIdAndDelete = (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then((order) => {
      res.status(201).json({
        deleted: true,
        order,
      });
    })
    .catch((err) => {
      res.json({ deleted: false, errMsg: err.message });
    });
};

// exports.findProductsByOrder = (req, res) => {
//   Order.findOne({ _id: req.params.id })
//     .populate("products_ids")
//     .exec()
//     .then((result) => {
//       if (!result) {
//         throw new Error("Couldn't Find Products!");
//       } else {
//         res.json({ products: result.products_ids });
//       }
//     })
//     .catch((err) => {
//       res.json({ errMsg: err.message });
//     });
// };

exports.findUserAndProductsByOrder = (req, res) => {
  Order.findOne({ _id: req.params.id })
    .populate("user_id")
    .populate("products_ids")
    .exec()
    .then((result) => {
      let { email, city, address, phone_number } = result.user_id;
      console.log(result)
      res.json({
        products: result.products_ids,
        user: {
          email,
          city,
          address,
          phone_number,
        }
      });
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.findOrderByIdAndUpdate = (req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body)
    .then((order) => res.json({ updated: true, order }))
    .catch((err) => res.json({ updated: false, errMsg: err.message }));
};

exports.removeProductFromOrder = (req, res) => {
  let _productPrice = 0;
  let _productQuantity = req.body.quantity;
  Product.findOne({ _id: req.body.id })
    .then((product) => {
      if (!product) throw new Error("Product not Exist!");
      _productPrice = product.price;
    })
    .then(() => {
      return Order.updateOne(
        { _id: req.params.id },
        { $inc: { total_price: -_productPrice * _productQuantity } }
      );
    })
    .then(() => {
      return Order.updateOne(
        { _id: req.params.id },
        { $pull: { products_ids: req.body.id } }
      );
    })
    .then(() => {
      return Order.findOne({ _id: req.params.id });
    })
    .then((order) => {
      res.status(200).json({ deleted: true, order_price: order.total_price });
    })
    .catch((err) => res.json(err));
};
