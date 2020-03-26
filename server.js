const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./src/routes/user');
const productRouter = require('./src/routes/product');
const adminRouter = require('./src/routes/admin');

app.use(express.json());
app.use(cors());
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/admins', adminRouter)

app.get('/', (req, res) => {
  res.send('<h1>Development ....</h1>')
})

// DB Connection
require('./src/database/connection');

// bootstrap
// require('./src/bootstrap')();

app.listen( 3000 , (err, res) => {
  err 
  ?
  console.log('Error while connecting to sevrer !', err)
  :
  console.log(`Connected to server on http://localhost:3000`);
});