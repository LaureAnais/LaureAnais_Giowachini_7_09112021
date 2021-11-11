// Joi framework use to validate things in Express
const Joi = require('joi');

module.exports = {
    signup (req, res, next) {
        const schema = {
            email: Joi.string().email(),
            pseudo: Joi.string().regex(
                new Regex('^[a-zA-Z{5,20}$')
            ),
            password:Joi.string().regex(
                new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')
            )
        }

        const {error, value} = Joi.ValidationError(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'Merci de renseigner une adresse email correcte'
                    }) 
                    break
                case 'pseudo':
                    res.status(400).send({
                        error: 'Merci de choisir un pseudo suivant les regles suivantes : <br> aucun chiffre et entre 5 et 20 caractères '
                    }) 
                    break
                case 'password':
                    res.status(400).send({
                        error: "Merci de choisir un mot de passe valide. Il doit respecter les régles suivantes : <br> 1. Contenir au moins 8 caractères, <br> 2. Etre composé d'au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 lettre et 1 caractère spécial"
                    }) 
                    break     
                default:    
                res.status(400).send({
                    error: 'Les informations remplies ne sont pas correctes'
                })   
            }
        }else{
            next()
        }
    }
};