const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name is Required"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Password is Required"]
  },
  category: {
    type: String,
    required: [true, "Category is Required"]
  },
  price: {
    type: Number,
    required: [true, "Price is Required"]
  },
  product_img: {
    type: String,
    required: [true, "Product Img is Required"]
  }
});

const Product = new mongoose.model("Product", productSchema);
module.exports = Product

// const Sequelize = require("sequelize");
// const sequelize = require("../database/connection");

// module.exports = sequelize.define("Product", {
//   id: {
//     type: Sequelize.INTEGER(11),
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       len: {
//         args: [1, 100],
//         msg: "Name of Product Cannot be empty!"
//       }
//     }
//   },
//   description: {
//     type: Sequelize.TEXT,
//     allowNull: false,
//     validate: {
//       len: {
//         args: [1, 1000],
//         msg: "Description Cannot be empty!"
//       }
//     }
//   },
//   category: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   price: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     validate: {
//       min: {
//         args: 1,
//         msg: "Price Can not be 0!"
//       }
//     }
//   },
//   product_img: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });
