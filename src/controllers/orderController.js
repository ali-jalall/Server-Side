const Order = require('../models/Order');

exports.findAllOrders = (req, res) => {
  Order.find()
    .then(orders => {
      if ( orders.length === 0 ) throw new Error('No Orders Yet!')
      res.json({ orders })
    })
    .catch(err => {
      res.json({ errMsg: err.message })
    })
}

exports.findOrderById = (req, res) => {
  Order.findOne({ _id: req.params.id })
    .then(order => {
      if ( !order ) throw new Error('No product!')
      res.json({ order })
    })
    .catch(err => {
      res.json({ errMsg: err.message })
    })
}

exports.addOrder = (req, res) => {
  console.log(req.body)
  Order.create(req.body)
    .then(order => {
      res.status(201).json({
        msg: 'Order added',
        order
      })
    })
    .catch(err => {
      res.json({ errMsg: err.message })
    })
}

exports.findOrderByIdAndDelete = (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then(order => {
      res.status(201).json({
        deleted: true
      })
    })
    .catch(err => {
      res.json({ deleted: false, errMsg: err.message })
    })
}