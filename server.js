const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./src/routes/user");
const productRouter = require("./src/routes/product");
const adminRouter = require("./src/routes/admin");
const mongoose = require("mongoose");
// const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
dotenv.config({
  path: './config.env'
});

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/admins", adminRouter);

app.get("*", (req, res) => {
  res.send("<h1>Development ....</h1>");
});

// DB Connection
// require('./src/database/connection');

// bootstrap
// require('./src/bootstrap')();

mongoose.Promise = global.Promise;
// Mongodb connection//
mongoose.connect(process.env.MONGODB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      console.log("Error while connecting .." + err);
    } else {
      console.log("Connected to Database");
    }
  }
);

app.listen((process.env.PORT || 3000), (err, res) => {
  err
    ? console.log("Error while connecting to sevrer !", err)
    : console.log(`Connected to server on http://localhost:3000`);
});
