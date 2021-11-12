const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.signup = (req, res, next) => {
  const user = new User({
    email: '',
    password: '',
  });
  console.log(res.status(200).json({ message: "signup" }))  
}
  
