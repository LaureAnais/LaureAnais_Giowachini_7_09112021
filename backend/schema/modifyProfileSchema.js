const Joi = require('joi');

module.exports = Joi.object({
    pseudo: Joi.string()
                .alphanum()
                .min(5)
                .max(20)
                .required()
});