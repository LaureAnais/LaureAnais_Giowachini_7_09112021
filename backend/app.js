const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/UserRoute');


// créer une application express 
const app = express();


// CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json()); 

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use(express.json());
//app.use(express.urlencoded({extended: true}));

//app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/signup', userRoutes);

// pour utiliser notre application express depuis notre serveur node
module.exports = app;