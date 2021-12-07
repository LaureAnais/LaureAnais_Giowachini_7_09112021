// Possibilité de commenter les posts 
// possibilité de liker? 

const db = require('../models');
const fs = require('fs');

exports.createComment = (req, res, next) => {



    
};

exports.getOneComment = (req, res, next) => {
    db.comments.findOne({ where: { id: req.params.id }})
     .then(comment => res.status(200).json({comment}))
     .catch(error => res.status(400).json({error}))
 };

exports.getAllComments = (req, res, next) => {
    db.comments.findAll()
    .then(comment => res.status(200).json({comment}))
    .catch(error => res.status(400).json({error}))
};

exports.modifyComment = (req, res, next) => {};

 // Attention ajouter possibilité pour Admin de supprimer comment
 exports.deleteComment = (req, res, next) => {};


 // Like & dislike on a post 