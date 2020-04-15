const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is Required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  phone_number: {
    type: String,
    default: "N/A",
  },
  address: {
    type: String,
    default: "N/A",
  },
  city: {
    type: String,
    default: "N/A",
  },
  age: {
    type: Number,
    required: [true, "Age is Required"],
  },
  products_bought: 
  [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = new mongoose.model("User", userSchema);

// const Sequelize = require("sequelize");
// const sequelize = require("../database/connection");

// module.exports = sequelize.define("User", {
//   id: {
//     type: Sequelize.INTEGER(11),
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   username: {
//     type: Sequelize.STRING(8),
//     allowNull: false,
//     unique: true,
//     validate: {
//       min: {
//         args: [6],
//         msg: "Username Must be more than 6 letters!"
//       }
//     }
//   },
//   password: {
//     type: Sequelize.TEXT,
//     allowNull: false,
//     validate: {
//       min: {
//         args: 8,
//         msg: "Password must be more than 8 letters"
//       }
//     }
//   }
// productsId: {
//   type: Sequelize.STRING,
//   get () {
//     return this.getDataValue('productsId').split(';');
//   },
//   set (val) {
//     this.setDataValue('productsId', val.join(';'));
//   }
// }
// });
