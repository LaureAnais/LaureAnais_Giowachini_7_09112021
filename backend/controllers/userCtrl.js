const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const fs = require('fs');
const schemaSignup = require('../schema/signupSchema');
const User = require('../models/User');
// const schemaLogin = require('../schema/loginSchema');

exports.signup = async (req, res, next) => {
    try {
        const user = {
            email: req.body.email,
            pseudo: req.body.pseudo,
            password: req.body.password
        }
        // if(user.findOne({email: req.query.email} {
         //   return res.status(400).json({message: 'Compte déjà existant, merci de vous connecter. '});
      //  }
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


// Mettre logique login dans schema login 

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (!user) {
            return res.status(401).json({error: 'Utilisateur non trouvé!'});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({error: 'Mot de passe incorrect!'});
                }
                res.status(200).json({
                    userId: user.id,
                    //admin
                    token: 'jwt.sign'(
                        {userId: user.id},
                        process.env.TOKEN_KEY,
                        { expiresIn: '24h'}
                    )
                });
            })
            .catch (error => {res.status(500).json({error})})
    })
    .catch (error => {res.status(500).json({error})})
}; 


