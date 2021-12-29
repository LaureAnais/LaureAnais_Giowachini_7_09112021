const db = require("../models");
const fs = require("fs");

const schemaComment = require("../schema/commentSchema");

exports.createComment = async (req, res, next) => {
  try {
    // 1- Vérification des données reçus du front
    const comment = {
      message: String(req.body.message),
    };

    const verifySchema = await schemaComment.validateAsync(comment);
    if (!verifySchema) {
      return res
        .status(400)
        .json({ message: "Information erronnée, merci de vérifier. " });
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
    comment.user_id = req.user.userId;

    // 3- Echange avec la base de données
    db.comments
      .create({ comment })
      // 4- Message de retour de l'application ( backend) au front
      .then(() => res.status(201).json({ message: "commentaire ajouté!" }))
      .catch((error) => res.status(400).json({ error }));
  } catch (err) {
    return res.status(500).json({ err });
  }
};

// Attention ajouter possibilité pour Admin de supprimer comment
exports.deleteComment = (req, res, next) => {
  db.comments
    .findOne({ where: { id: req.params.id } })
    .then((comment) => {
      // Vérifier que la personne qui a posté le commentaire est bien le meme que celui qui est enregistré via le TOKEN
      if (comment.user_id !== req.user.userId) {
        return res
          .status(401)
          .json({ error: "Vous ne pouvez pas réaliser cette opération" });
      }
      return comment.destroy();
    })
    .then(() =>
      res.status(200).json({ message: "Le commentaire est supprimé !" })
    )
    .catch((error) =>
      res
        .status(401)
        .json({
          message:
            "Vous ne bénéficiez pas des droits permettant la suppression de ce commentaire!",
        })
    )

    .catch((error) => res.status(500).json({ error }));
};

exports.updateComment = async (req, res, next) => {
  try {
    // 1- Vérification des données reçus du front
    const comment = {
      message: String(req.body.message),
    };

    const verifySchema = await schemaComment.validateAsync(comment);
    if (!verifySchema) {
      return res
        .status(400)
        .json({ message: "Information erronnée, merci de vérifier. " });
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
    db.comments
      .findOne({ where: { id: req.params.id } })
      .then((comment) => {
        if (comment.id !== req.user.userId) {
          res
            .status(200)
            .json({
              message:
                "Vous n'avez pas les droits suffisants pour cette action.",
            });
        }
        // 3- Echange avec la base de données

        db.comments.update({ ...comment });
      })
      // 4- Message de retour de l'application ( backend) au front
      .then((comment) => {
        return res.status(201).json({ comment });
      })
      .catch((err) => {
        return res.status(500).json({ err: err.message });
      });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

exports.getOneComment = (req, res, next) => {
  db.comments
    .findOne({ where: { id: req.params.id } })
    .then((comment) => res.status(200).json({ comment }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllComments = (req, res, next) => {
  db.comments
    .findAll()
    .then((comment) => res.status(200).json({ comment }))
    .catch((error) => res.status(400).json({ error }));
};
