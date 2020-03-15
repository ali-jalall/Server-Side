module.exports = async () => {
  const User = require('./models/User');
  const Product = require('./models/Product');

  let user = await Product.create({
    name: 'e',
    description: 'fsdlfmsdlkfns',
    price: 1
  }).catch(err => err)

  console.log(user);


}