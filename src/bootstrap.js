module.exports = async () => {
  const User = require('./models/User');
  const Product = require('./models/Product');

  let user = await User.create({
    username: 'Ali Jalal',
    password: '00000000000',
  }).catch(err => err)

  console.log(user);


}