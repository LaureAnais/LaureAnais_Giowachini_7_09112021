const Joi = require('joi');

module.exports = Joi.object({
    message:Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9~!@#$%^&*()`\[\]{};':,./<>?| ]*$/))
    .required(), 
});