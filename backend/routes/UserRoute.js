const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const multerConfig = require('../middleware/multer-config');
const limiter = require('../middleware/express-limit');

router.post('/signup', userCtrl.signup);
router.post('/login', limiter, userCtrl.login);
router.get('/:id', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUsers);
router.put('/:id', auth, multerConfig, userCtrl.updateProfile);
router.delete('/:id', auth, userCtrl.deleteProfile);

module.exports = router;  
