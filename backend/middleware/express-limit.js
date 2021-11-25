const rateLimit = require("express-rate-limit");


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, 
  message:
    "Vous avez dépassé vos tentatives de connexion, merci de réessayer ultérieurement",
  headers: true
});

module.exports = limiter ;