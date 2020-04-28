const mongoose = require("mongoose");
const connection = mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://alijalal:0000@cluster0-cbm2v.mongodb.net/test?retryWrites=true&w=majority",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("Error while connecting .." + err);
    } else {
      console.log("Connected to Database");
    }
  }
);

module.exports = connection;