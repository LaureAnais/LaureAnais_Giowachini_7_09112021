const db = require("../models");
const fs = require("fs");

const schemaPost = require("../schema/postSchema");

exports.createPost = async (req, res, next) => {
  try {
    // 1- Vérification des données reçus du front
    const post = {
      message: req.body.message,
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
      .create(post)
      // 4- Message de retour de l'application ( backend) au front
      .then(() => res.status(201).json({ message: "post ajouté!" }))
      .catch((error) => res.status(400).json({ error }));
  } catch (err) {
    return res.status(500).json({ err });
  }
};

// Suivant les roles de la base de données, modifier la route
exports.deletePost = async (req, res, next) => {
  try {
    const tokenDB = await db.users.findOne({
      where: { id: req.user.userId },
    });
    if (!tokenDB) {
      return res.status(401).json({ error: "Merci de vous identifier" });
    }
    db.posts
      .findOne({ where: { id: req.params.id } })
      .then((post) => {
        if (!post) {
          return res.status(400).json({ message: "Le post n'existe pas" });
        }
        // Vérifier que la personne qui a fait le post est bien le meme que celui qui est enregistré via le TOKEN
        if (post.user_id == tokenDB.id || tokenDB.roles == 1) {
          return post.destroy()
          .then(() => res.status(200).json({ message: "Le post est supprimé !" }))
          .catch((error) => res.status(500).json({ error }));
        }
        return res
          .status(403)
          .json({ error: "Vous ne pouvez pas réaliser cette opération" });
      })
      
  } catch (err) {
    return res.status(500).json({ err });
  }
};

exports.Updatepost = async (req, res, next) => {
  try {
    // Traitement de données = préparer la requette
    // 1- Vérification des données reçus du front
    const post = {};

    if (req.body.message) {
      post.message = req.body.message;
      const verifySchema = await schemaPost.validateAsync(post);
      if (!verifySchema) {
        return res
          .status(400)
          .json({ message: "Information erronnée, merci de vérifier. " });
      }
    }

    if (req.file) {
      post.picture_uploaded = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }
    // 2- Traitement des données (préparation de requete)
    const userDB = await db.users.findOne({
      where: { id: req.user.userId },
    });
    if (!userDB) {
      return res
        .status(401)
        .json({ message: "Information erronnée, merci de vérifier. " });
    }
    db.posts
      .findOne({ where: { id: req.params.id } })
      .then((postDB) => {
        if (postDB.id !== req.user.userId) {
          res
            .status(200)
            .json({
              message:
                "Vous n'avez pas les droits suffisants pour cette action.",
            });
        }
        if (postDB.picture_uploaded) {
          const fileName = postDB.picture_uploaded.split("/images/")[1];
          fs.unlink(`app/images/${fileName}`, (err) => {
            // Ternaire
            err ? console.log(err) : console.log("image supprimée !");
          });
        }

        // 3- Echange avec la base de données
        return postDB.update({ ...post });
      })
      // 4- Message de retour de l'application (backend) au front
      .then((post) => {
        return res.status(201).json(post);
      })
      .catch((err) => {
        return res.status(500).json({ err: err.message });
      });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

exports.getOnePost = (req, res, next) => {
  db.posts
    .findOne({ where: { id: req.params.id } })
    .then((post) => res.status(200).json({ post }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
  db.posts
    .findAll(
      { order: [["createdAt", "DESC"]],
        include: [ {
        model: db.users, 
        as: "fk_users_posts",
        attributes: ["pseudo"]  
      }, 
     {
      model: db.comments, 
      as: "fk_posts_comments",
      attributes: ["message", "id"], 
      include: [{
        model: db.users, 
        as: "fk_users_comments",
        attributes: ["pseudo"]
      } ]} 
     
    ]}
    )
    .then((post) => res.status(200).json( post ))
    .catch((error) => res.status(500).json({ message : error.message }));
};

exports.likeDislikePost = async (req, res, next) => {
  try {
    // 1- Vérification des données reçues du front

    const likes = {
      // ma clé = une valeur
      postlikes: req.body.postlikes,
      postdislikes: req.body.postdislikes,
    };

    if (!likes.postlikes || !likes.postdislikes) {
      return res
        .status(400)
        .json({ message: "Information erronnée, merci de vérifier. " });
    }
    // Choix neutre
    if (likes.postlikes === likes.postdislikes) {
      likes.postlikes = 0;
      likes.postdislikes = 0;
    }
    // likes
    if (likes.postlikes) {
      likes.postlikes = 1;
      likes.postdislikes = 0;
    }
    // dislikes
    if (likes.postdislikes) {
      likes.postdislikes = 1;
      likes.postlikes = 0;
    }

    const tokenDB = await db.users.findOne({ where: { id: req.user.userId } });
    if (!tokenDB) {
      res.status(401).json({ message: "Merci de vous identifier" });
    }

    // 2- Traitement des données (préparation de requete)
    const userlikeDB = await db.likes.findOne({
      where: { id_users: tokenDB.id, id_posts: req.params.id },
    });
    const postDB = await db.posts.findOne({ where: { id: req.params.id } });
    if (!postDB) {
      res.status(401).json({ message: "Post non trouvé" });
    }
    // console.log(userlikeDB);

    // 3- Echange avec la base de données
    if (!userlikeDB) {
      (likes.id_users = tokenDB.id), (likes.id_posts = postDB.id);
      db.likes
        .create(likes)
        .then(() => {
          return res
            .status(200)
            .json({ message: "Votre choix a été pris en compte" });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    } else {
      userlikeDB
        .update({ ...likes })
        .then(() => {
          return res.status(200).json({ message: "Votre choix a été modifié" });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
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

// 1- Vérification des données reçus du front
// 2- Traitement des données
// 3- Echange avec la base de données
// 4- Message de retour de l'application ( backend) au front
