const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const db = require('../models/index.model');
const fs = require('fs');

exports.signup = (req, res, next) => { 
    if (!req.body.password.match
        (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/)){
        return res.status(400).json({ error : "Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces."})
    }
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new UserModel({
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