const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require('../models/user-model');
const dotenv = require('dotenv').config();

exports.signup = (req, res, next) => {
    if (!req.body.password.match
        (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
        return res.status(400).json({ error : "Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces."})
    }
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new db({
            email: req.body.email,
            pseudo: req.body.pseudo,
            password: hash
          });
          //const sql = "INSERT INTO users SET ?";
          user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    };

// exports.login = (req, res, next) =>{};

// Find all Users.
exports.findAll = (req, res) => {
  
};

// Find one user with an id
exports.findOne = (req, res) => {
  
};

// Delete a post with the specified id in the request // only Admin
exports.delete = (req, res) => {
  
};
