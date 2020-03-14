const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>Production ....</h1>')
})

app.listen({ port: 3000 }, (err, res) => {
  err 
  ?
  console.log('Error while connecting to sevrer !')
  :
  console.log(`Connected to server on http://localhost:3000`)
})

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });