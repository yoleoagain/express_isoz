const router = require('express').Router()
const AuthorController = require('../Controller/AuthorController')

router.get('/authors', AuthorController.getAuthor)
router.post('/authors', AuthorController.createAuthor)
router.put('/authors/:id', AuthorController.updateAuthor)
router.delete('/authors/:id', AuthorController.deleteAuthor)

module.exports = router