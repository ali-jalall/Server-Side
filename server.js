const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRouter = require('./src/routes/user');
const productRouter = require('./src/routes/product');
const adminRouter = require('./src/routes/admin');

app.use(express.json());
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/admins', adminRouter)

app.get('/', (req, res) => {
  res.send('<h1>Development ....</h1>')
})

// DB Connection
require('./src/database/connection');

// const  findUserByIdAndUpdate  = require('./src/models/User');
// const addProduct = require('./src/controllers/productController');

// console.log(addProduct.addProduct({
//   name: 'Hair Drier',
//   description: 'this is my first product',
//   category: 'Home',
//   price: 120
// }));
// findUserByIdAndUpdate(3, {productsId: '636274524'})
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

// bootstrap
// require('./src/bootstrap')();

const Admin = require('./src/models/Admin');

app.listen({ port: 3000 }, (err, res) => {
  err 
  ?
  console.log('Error while connecting to sevrer !', err)
  :
  console.log(`Connected to server on http://localhost:3000`);
});