// Possibilité de commenter les posts 
// possibilité de liker? 

const db = require('../models');
const fs = require('fs');

exports.createComment = (req, res, next) => {
    db.comments.create({
        user_id: req.body.user_id,
        id_posts: req.body.id_posts,
        comments: req.body.comments
    })
    .then(() => res.status(201).json({ message: 'commentaire ajouté!'}))
    .catch(error => res.status(400).json({ error }))  
};

// Attention ajouter possibilité pour Admin de supprimer comment
exports.deleteComment = (req, res, next) => {
    db.comments.findOne({where: { id: req.params.id }})
    .then(comment => {
        // Vérifier que la personne qui a posté le commentaire est bien le meme que celui qui est enregistré via le TOKEN
        if(comment.user_id !== req.user.userId) {
            return res.status(401).json({error: 'Vous ne pouvez pas réaliser cette opération'});
        }
        return comment.destroy()
        })
        .then(() => res.status(200).json({ message: 'Le commentaire est supprimé !'}))
        .catch(error => res.status(401).json({ message: 'Vous ne bénéficiez pas des droits permettant la suppression de ce commentaire!' }))

    .catch(error => res.status(500).json({ error }));
};



exports.updateComment = (req, res, next) => {};

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




 // Like & dislike on a post 