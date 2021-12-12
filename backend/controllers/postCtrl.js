const db = require("../models");
const schemaPost = require("../schema/createPostSchema");

exports.createPost = async (req, res, next) => {
  try {
    // 1- Vérification des données reçus du front
    const post = {
      message: String(req.body.message),
    };

    const verifySchema = await schemaPost.validateAsync(post);
    if (!verifySchema) {
      return res
        .status(400)
        .json({ message: "Information erronnée, merci de vérifier. " });
    }

    const userDB = await db.users.findOne({
      where: { id: req.user.userId },
    });
    if (!userDB) {
      return res
        .status(401)
        .json({ message: "Information erronnée, merci de vérifier. " });
    }
    post.user_id = req.user.userId;

    if (req.file) {
      post.picture_uploaded = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }

    // 3- Echange avec la base de données

    db.posts
      .create( post )
      // 4- Message de retour de l'application ( backend) au front
      .then(() => res.status(201).json({ message: "post ajouté!" }))
      .catch((error) => res.status(400).json({ error }));
  } catch (err) {
    return res.status(500).json({ err });
  }
};

// Suivant les roles de la base de données, modifier la route
exports.deletePost = (req, res, next) => {
  db.posts
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      // Vérifier que la personne qui a fait le post est bien le meme que celui qui est enregistré via le TOKEN
      if (post.user_id !== req.user.userId) {
        return res
          .status(403)
          .json({ error: "Vous ne pouvez pas réaliser cette opération" });
      }
      return post.destroy();
    })
    .then(() => res.status(200).json({ message: "Le post est supprimé !" }))
    .catch((error) => res.status(500).json({ error }));
};

// 1- Vérification des données reçus du front
// 2- Traitement des données
// 3- Echange avec la base de données
// 4- Message de retour de l'application ( backend) au front

// Penser à l'image dans le post
exports.Updatepost = (req, res, next) => {
  // soit l'utilisateur veut modifier son texte
  // Soit il veut supprimer la photo
  // Soit il veut ajouter une photo
  // Soit il veut changer / modifier la photo qu'il avait mis
};

exports.getOnePost = (req, res, next) => {
  db.posts
    .findOne({ where: { id: req.params.id } })
    .then((post) => res.status(200).json({ post }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
  db.posts
    .findAll()
    .then((post) => res.status(200).json({ post }))
    .catch((error) => res.status(400).json({ error }));
};

// 1. recherche si dans ta table utilisateur a déjà liké ou disliké ce post
//  - Si OUI
//      - Il a déjà liké
// Choix 1 = il redevient neutre = retire un like de mon conteur + delete la ligne dans la table des likes
// Choix 2 = il change d'avis / il passe à dislike = retire 1 like + ajout d'1 dislike + update de la ligne qu'il a déjà

//      - Il a déjà disliké
// Choix 1 = il redevient neutre = retire 1 dislike au conteur + delete la ligne de la table des likes
// Choix 2 = il change d'avis / il passe de dislike à like = retire 1 dislike + ajoutt 1 like + faire le update

// - Si NON
//      - Il veut liker
// On ajoute 1 like + créer 1 ligne dans ma table like (INSERT)
//      - Il veut disliker
// On ajoute 1 dislike + créer 1 ligne dans ma table like (INSERT)

// exports.likeDislikePost = (req, res, next) => {
//     if ()  {
//         db.likes.findOne({ _id: req.params.id })
//         .then(like => {
//         if (like.id_users.includes(req.body.userId)) {
//           like.updateOne({_id: req.params.id} , {$inc: {likes: -1 } , $pull: {usersLiked: req.body.userId} })
//     }

// };

// if (req.body.like === 1)
// // Création d'un like (avoir 1 post / 1 utilisateur (userId) / agrémenter le post d'un like)
//   db.posts.update({_id: req.params.id} , {$inc: {likes: 1 } , $set : {usersLiked: req.body.userId} })
//   .then(() => res.status(200).json({ message: 'Post likée !'}))
//   .catch((error) => {res.status(404).json({error});});

//  // Si l'utilisateur ne veut pas liker / Alors il veut dislike
//  else if (req.body.like === -1)
//  // Création d'un dislike (on retire 1 like à 1 post)
//   Post.updateOne({_id: req.params.id} , {$inc: {dislikes: 1 } , $set: {usersDisliked: req.body.userId} })
//   .then(() => res.status(200).json({ message: 'Un dislike ajouté :( '}))
//   .catch((error) => {res.status(404).json({error});});

//  else {
//     db.posts.findOne({ _id: req.params.id })
//     .then(post => {
//     if (post.usersLiked.includes(req.body.userId)) {
//       Post.updateOne({_id: req.params.id} , {$inc: {likes: -1 } , $pull: {usersLiked: req.body.userId} })
//         .then(() => res.status(200).json({ message: 'Un like enlevé :( '}))
//         .catch((error) => {res.status(404).json({error});});
//     }
//     else {
//       Post.updateOne({_id: req.params.id} , {$inc: {dislikes: -1 } , $pull: {usersDisliked: req.body.userId} })
//         .then(() => res.status(200).json({ message: 'Un dislike enlevé :) '}))
//         .catch((error) => {res.status(404).json({error});});
//     }
//   })
//  }
