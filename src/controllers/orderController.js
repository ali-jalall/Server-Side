const Order = require("../models/Order");
const Product = require("../models/Product");

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
  console.log(req.body);
  Order.create(req.body)
    .then((order) => {
      res.status(201).json({
        msg: "Order added",
        order,
      });
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
        order
      });
    })
    .catch((err) => {
      res.json({ deleted: false, errMsg: err.message });
    });
};

exports.findProductsByOrder = (req, res) => {
  Order.findOne({ _id: req.params.id })
    .populate("products_ids")
    .exec()
    .then((result) => {
      if (!result) {
        throw new Error("Couldn't Find Products!");
      } else {
        res.json({ products: result.products_ids });
      }
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.findUserByOrder = (req, res) => {
  Order.findOne({ _id: req.params.id })
    .populate("user_id")
    .exec()
    .then(({ user_id }) => {
      let { email, city, address, phone_number } = user_id;
      res.json({
        email,
        city,
        address,
        phone_number,
      });
    })
    .catch((err) => {
      res.json({ errMsg: err.message });
    });
};

exports.findOrderByIdAndUpdate = (req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body)
    .then((order) => res.json(order))
    .catch((err) => res.josn(err));
};

exports.removeProductFromOrder = (req, res) => {
  let _productPrice = 0;
  Product.findOne({ _id: req.body.id })
    .then((product) => {
      if (!product) throw new Error("Product not Exist!");
      _productPrice = product.price;
    })
    .then(() => {
      return Order.update(
        { _id: req.params.id },
        { $inc: { total_price: -_productPrice } }
      );
    })
    .then(() => {
      return Order.update(
        { _id: req.params.id },
        { $pull: { products_ids: req.body.id } }
      );
    })
    .then(() => {
      return Order.findOne({ _id: req.params.id })
    })
    .then(order => {
      console.log(order)
      res.status(201).json({ order });
    })
    .catch((err) => res.json(err));
};
