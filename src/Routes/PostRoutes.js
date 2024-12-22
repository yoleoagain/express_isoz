const router = require('express').Router()
const PostController = require('../Controller/PostController')

router.get('/posts', PostController.getPosts)
router.post('/posts/:user_id', PostController.createPost)
router.put('/posts/:user_id/:id', PostController.updatePost)
router.delete('/posts/:user_id/:id', PostController.deletePost)

module.exports = router