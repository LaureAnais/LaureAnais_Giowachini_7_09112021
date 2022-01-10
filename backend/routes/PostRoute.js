const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postCtrl = require('../controllers/postCtrl');
const multerConfig = require('../middleware/multer-config');

router.post('/', auth, multerConfig, postCtrl.createPost);
router.post('/:id/like', auth, postCtrl.likeDislikePost);
router.get('/:id', auth, postCtrl.getOnePost);
// Rajouter auth à la route postCtrl.getAllPosts
router.get('/', postCtrl.getAllPosts);
router.put('/:id', auth, multerConfig, postCtrl.Updatepost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;  