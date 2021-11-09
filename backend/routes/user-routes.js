const router = require('express').Router();
const auth = require('../middleware/auth-controller.js')
const userCtrl = require('../controllers/user-controller');

router.post('/signup', userCtrl.signup);

module.exports = router; 