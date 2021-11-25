const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const fs = require('fs');


const User = require('../models/User');
const schemaSignup = require('../schema/signupSchema');
// const schemaLogin = require('../schema/loginSchema');

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
        return res.status(500).json({message: err.message});
     }
        
};

 // Mettre logique login dans schema login 

 exports.login = (req, res, next) => {
    db.User.findOne({email: req.body.email})
    .then(user => {
        if (!user) {
            return res.status(401).json({error: 'Utilisateur non trouvé!'});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({error: 'Les informations renseignées ne sont pas correctes!'});
                }
                res.status(200).json({
                    userId: user.id,
                    //admin
                    token: 'jwt.sign'(
                        {
                            userId: user.id
                        },
                        process.env.TOKEN_KEY,
                        { 
                            expiresIn: '14h'
                        }
                    )
                });
            })
            .catch (error => {res.status(500).json({error})})
    })
    .catch (error => {res.status(500).json({error})})
};

exports.getOneUser = (req, res, next) => {
    db.User.findOne(
        {attributes: 
        ['id', 'email', 'pseudo', 'profile_picture', 'id_roles', 'createdAt', 'updateAt'],
        where: {
        id: req.params.id
    }})
    .then(user => res.status(200).json({user}))
    .catch(error => res.status(404).json({error}))
}
    

exports.getAllUsers = (req, res, next) => {
    db.User.findAll(
        {attributes: 
        ['id', 'email', 'pseudo', 'profile_picture', 'id_roles', 'createdAt', 'updateAt'],
    })
    .then(user => res.status(200).json({user}))
    .catch(error => res.status(404).json({error}))
};

exports.updateProfile = (req, res, next) => {
    const UserObject = req.file ?
    {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    user.updateOne({ _id: req.params.id }, { ...UserObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Compte utilisateur modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

// Supprimer un profil =
// 1. Trouver le bon profil à supprimer
// 2. Vérifier qui fait la demande de suppression : l'utilisateur lui même ou l'administrateur 
// 3. Si droit ok = supprimer l'ensemble des éléments du compte 
exports.deleteProfile = (req, res, next) => {
    db.User.findOne({ where: { id: req.params.id }})
    .then(user => {
      // if(user.id !== ()) {
      //  return res.status(401).json({error: 'Vous ne pouvez pas réaliser cette opération'});
      // }
            user.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Compte utilisateur supprimé !'}))
              .catch(error => res.status(401).json({ message: 'Vous ne bénéficiez pas des droits permettant la suppression de ce compte!' }));
          })
    
    .catch(error => res.status(500).json({ error }));
};
