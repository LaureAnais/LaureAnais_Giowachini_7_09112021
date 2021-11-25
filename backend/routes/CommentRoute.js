const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const multerConfig = require('../middleware/multer-config');


module.exports = router;  