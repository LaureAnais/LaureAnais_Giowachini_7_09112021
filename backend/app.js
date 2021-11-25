const express = require("express");
const app = express();
require("dotenv").config();

const path = require('path');
const bodyParser = require('body-parser');

// CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(bodyParser.json());   
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/images', express.static(path.join(__dirname, 'images')));

const db = require('./models');
db.sequelize.sync();
// Pour la création / modification d'une table
//db.sequelize.sync({force: true});

// Routes files
const userRoutes = require('./routes/UserRoute');

// Routes
app.use("/api/user", userRoutes);

// pour utiliser notre application express depuis notre serveur node
module.exports = app;