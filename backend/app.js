const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const path = require('path');
const usersRoutes = require('./routes/users');
const helmet = require('helmet');

const app = express();
// app.use(morgan('combined'));
app.use(bodyParser.json);
app.use(cors());

app.use(helmet());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/users', usersRoutes);

module.exports = app;