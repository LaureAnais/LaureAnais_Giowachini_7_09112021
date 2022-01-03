const Joi = require('joi');

module.exports = Joi.object({
    message:Joi.string()
    .pattern(new RegExp(/^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F0-9~!@#$%^&*()`\[\]{};':,./<>?| ]*$/))
    .required(), 
});