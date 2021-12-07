const { users } = require('../models');
const db = require('../models');

// Possibilité d'ajouter une image à un post
exports.post = (req, res, next) => {
    db.posts.create({
        //userId ou author
        author: req.body.id_author,
        message: req.body.message,
        picture_uploaded: req.body.picture_uploaded
    })
    .then(() => res.status(201).json({ message: 'post ajouté!'}))
    .catch(error => res.status(400).json({ error }))  
};

// Suivant les roles de la base de données, modifier la route
exports.deletePost = (req, res, next) => {
    db.posts.findOne({where: { id: req.params.id }})
    .then(post => {
        if(post.userId !== req.post.userId) {
            return res.status(401).json({error: 'Vous ne pouvez pas réaliser cette opération'});
        }
        return post.destroy()
        })
        .then(() => res.status(200).json({ message: 'Le post est supprimé !'}))
        .catch(error => res.status(401).json({ message: 'Vous ne bénéficiez pas des droits permettant la suppression de ce post!' }))

    .catch(error => res.status(500).json({ error }));
};

// 1- Vérification des données reçus du front 
// 2- Traitement des données
// 3- Echange avec la base de données
// 4- Message de retour de l'application ( backend) au front


// Penser à l'image dans le post
exports.Updatepost = (req, res, next) => {

};

exports.getOnePost = (req, res, next) => {
   db.posts.findOne({ where: { id: req.params.id }})
    .then(post => res.status(200).json({post}))
    .catch(error => res.status(400).json({error}))
};

exports.getAllPosts = (req, res, next) => {
    db.posts.findAll()
    .then(post => res.status(200).json({post}))
    .catch(error => res.status(400).json({error}))
};

