const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const fs = require('fs');
const schemaSignup = require('../schema/signupSchema');

exports.signup = async (req, res, next) => {
    try {
        const user = {
            email: req.body.email,
            pseudo: req.body.pseudo,
            password: req.body.password
        }
        const verifySchema = await schemaSignup.validateAsync(user)
        if (!verifySchema){
            return res.status(400).json({message: 'Information erronnée, merci de vérifier. '});
        }
        db.users.create(user)
        .then(user => {return res.status(201).json({user})})
        .catch(err => {return res.status(500).json({err})})
     } catch(err) {
        return res.status(500).json({message: err.message});
     }
        
};
