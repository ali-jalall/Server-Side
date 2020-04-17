const mongoose = require("mongoose");
const connection = mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://alijalal:0000@cluster0-cbm2v.mongodb.net/test",
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

// const sequelize = new Sequelize('sql7330157', 'sql7330157', 'unbbZPikqx', {
//   host: 'sql7.freemysqlhosting.net',
//   dialect: 'mysql',
//   operatorsAliases: false
// })

// module.exports = sequelize;
// global.sequelize = sequelize;