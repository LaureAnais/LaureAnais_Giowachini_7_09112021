const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postCtrl = require('../controllers/postCtrl');

router.post('/', auth, postCtrl.post);
router.put('/', auth, postCtrl.Updatepost);
router.get('/', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;  