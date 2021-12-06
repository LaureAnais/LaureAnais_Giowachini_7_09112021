const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const fs = require('fs');

const schemaSignup = require('../schema/signupSchema');
const schemaLogin = require('../schema/loginSchema');

exports.signup = async (req, res, next) => {   
    try {
        const user = {
            email: String(req.body.email),
            pseudo: String(req.body.pseudo),
            password: String(req.body.password)
        }
        
        const verifySchema = await schemaSignup.validateAsync(user)
        if (!verifySchema){
            return res.status(400).json({message: 'Information erronnée, merci de vérifier. '});
        }
        const emailVerifBD = await db.users.findOne({
            where:{email:user.email}
        })
        const pseudoVerifBD = await db.users.findOne({
            where:{pseudo:user.pseudo}
        })
        if (emailVerifBD || pseudoVerifBD){
            return res.status(400).json({message: 'Compte déjà crée, merci de vous enregistrer. '});
        }
        bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash
            return db.users.create(user)
        })

        .then(user => {return res.status(201).json({user})})
        .catch(err => {return res.status(500).json({err})})
     } catch(err) {
        return res.status(500).json({err});
     }
        
};

 exports.login =  async (req, res, next) => {
    try {
        const user = {
            email: String(req.body.email),
            password: String(req.body.password)
        }
        const verifySchema = await schemaLogin.validateAsync(user)
        if (!verifySchema){
            return res.status(400).json({message: 'Information erronnée, merci de vérifier. '});
        }
        const userDB = await db.users.findOne({
            where:{email:user.email}
        })
        if (!userDB ){
            return res.status(400).json({message: 'Information erronnée, merci de vérifier. '});
        }
        bcrypt.compare(user.password, userDB.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({error: 'Les informations renseignées ne sont pas correctes!'});
                }
                res.status(200).json({
                    userId: userDB.id,
                    //admin
                    token: jwt.sign (
                        {
                            userId: userDB.id
                        },
                            process.env.TOKEN_KEY,
                        { 
                            expiresIn: '24h'
                        }
                    )
                });
            })
            .catch (err => {res.status(500).json({err})})
    }  catch(err) {
        return res.status(500).json({err});
     } 
};

exports.getOneUser = (req, res, next) => {
    db.users.findOne(
        {attributes: 
            {exclude: ['password']},
        where: {
        id: req.params.id
    }})
    .then(user => res.status(200).json({user}))
    .catch(error => res.status(400).json({error}))
}
    

exports.getAllUsers = (req, res, next) => {
    console.log(req.user)
    db.users.findAll(
        {attributes: 
            {exclude: ['password']}
    })
    .then(user => res.status(200).json({user}))
    .catch(error => res.status(400).json({error}))
};

exports.updateProfile = async (req, res, next) => { 
    try {
    const user = {}
    if (req.body.pseudo) {
        user.pseudo = String (req.body.pseudo)
        // Vérifier info du front en utilisatn Joi
        // Attention : nouveau pseudo doit etre ok avec schema joi 
    }
    if (req.file) {
        user.profile_picture = String (req.body.profile_picture)
        // Vérifier s'il y a une image 
        // Si oui la supprimer
        // puis enregistrer nouvelle image 
    }
     db.users.findOne({
        where: {
        id: req.params.id
    }})
    // Enlever le .then et remettre le await 
    .then((userDB) => {
       return userDB.update({...user})
    })
    .then(user => {return res.status(201).json({user})})
    .catch(err => {return res.status(500).json({err: err.message})})
    
     //   imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      
} catch(err) {
    return res.status(500).json({err});
 } 
};

exports.deleteProfile = (req, res, next) => {
    db.users.findOne({ where: { id: req.params.id }})
    .then(user => {
      if(user.id !== req.user.userId) {
          // req.user.role = quand je voudrais savoir par rapport à admin ou non
       return res.status(401).json({error: 'Vous ne pouvez pas réaliser cette opération'});
      }
           return user.destroy()
          })
          .then(() => res.status(200).json({ message: 'Compte utilisateur supprimé !'}))
          .catch(error => res.status(401).json({ message: 'Vous ne bénéficiez pas des droits permettant la suppression de ce compte!' }))
    
    .catch(error => res.status(500).json({ error }));
};
