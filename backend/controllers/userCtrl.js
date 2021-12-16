const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const fs = require('fs');

const schemaSignup = require('../schema/signupSchema');
const schemaLogin = require('../schema/loginSchema');
const schemaModifyProfile = require('../schema/modifyProfileSchema');

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
    // Ajouter la vérification de qui demande le changement de profile (cf Token req.user.userId)
    try {
    const user = {}
    if (req.body.pseudo) {
        user.pseudo = String (req.body.pseudo)
        const verifySchema = await schemaModifyProfile.validateAsync(user)
        if (!verifySchema){
            return res.status(400).json({message: 'Information erronnée, merci de vérifier. '});
        }
    } 
    if (req.file) {
        // je donne uniquement un nom à l'image = req.file.filename 
        // j'envoie uniquement ce nom dans la base de donnée pas l'image elle meme
        user.profile_picture =`${req.protocol}://${req.get("host")}/images/${
            req.file.filename}` 
    }
    const tokenDB = await db.users.findOne({
        where: {
            id: req.user.userId
        }
    })

    const userDB = await db.users.findOne({
        where: {
        id: req.params.id
    }})

        if (tokenDB!==userDB) {
            return res.status(403).json({message: "Vous n'avez pas les droits suffisants pour cette action."})
        } 
    const pseudoDB = await db.users.findOne({
        where: {
            pseudo: user.pseudo
     }})
    
        if (pseudoDB) {
            return res.status(403).json({message : "pseudo déjà utilisé !"})
        }

        // On recupère le nom de l'image dans la base de données / puis on pourra supprimer l'image
        const fileName = userDB.profile_picture.split("/images/")[1];    
        fs.unlink(`app/images/${fileName}`, (err) => {
            // Ternaire 
             err ? console.log(err) : console.log("image supprimée !")
              })
        // update dans la base de données
        userDB.update({...user})
    
    .then(user => {return res.status(201).json(user)})
    .catch(err => {return res.status(500).json({err: err.message})})
    
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
          .catch(error => res.status(500).json({ error }))
};
