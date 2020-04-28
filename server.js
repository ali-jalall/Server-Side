const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const userRouter = require("./src/routes/user");
const productRouter = require("./src/routes/product");
const adminRouter = require("./src/routes/admin");
const categoryRouter = require("./src/routes/category");
const orderRouter = require("./src/routes/order");
const helmet = require("helmet");

const app = express();

mongoose.Promise = global.Promise;
dotenv.config({
  path: "./config.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/admins", adminRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.set("port", process.env.PORT || 5000);

app.get("*", (_, res) => res.send("<h1>Development ....</h1>"));

// DB Connection
require("./src/database/connection");

app.listen(app.get("port"), function () {
  console.log("Node server is running on port " + app.get("port"));
});
``