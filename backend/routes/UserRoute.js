const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const multerConfig = require('../middleware/multer-config');
const limiter = require('../middleware/express-limit');

router.post('/signup', userCtrl.signup);
router.post('/login', limiter, userCtrl.login);
router.put('/:id', auth, multerConfig, userCtrl.updateProfile);
router.get('/:id', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUsers);
router.delete('/:id', auth, multerConfig, userCtrl.deleteProfile);


module.exports = router;  
