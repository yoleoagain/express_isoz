const router = require('express').Router()
const BooksController = require('../Controller/BooksController')

router.get('/books', BooksController.getBooks)
router.post('/books/:author_id', BooksController.createBook)
router.put('/books/:author_id/:id', BooksController.updateBook)
router.delete('/books/:author_id/:id', BooksController.deleteBook)

module.exports = router