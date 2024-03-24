const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authUser');
const postController = require('../controllers/postControl');

router.use(authToken);


router.post('/', postController.postSnippet); // Create new post snippet
router.get('/all-posts', postController.getAllUserPosts); // Get all existing posts
router.get('/:postId'. postController.getOnePost); // Get single post
router.put('/edit/:postId', postController.editPost); // Edit a single post
router.delete('/:postId', postController.deletePost); // Delete a single post
router.post('/like/:postId', postController.likeAPost); // Like a single post
router.post('/dislike/:postId', postController.dislikeAPost); // Dislike a single post

exports.routes = router;