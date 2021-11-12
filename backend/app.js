const express = require('express');
const bodyParser = require('body-parser');

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

const userRoutes = require('./routes/UserRoute');

app.use('/signup', userRoutes); 

// pour utiliser notre application express depuis notre serveur node
module.exports = app;