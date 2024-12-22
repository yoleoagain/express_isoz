const router = require('express').Router()
const GenreController = require('../Controller/GenreController')

router.get('/genres', GenreController.getGenre)
router.post('/genres', GenreController.createGenre)
router.put('/genres/:id', GenreController.updateGenre)
router.delete('/genres/:id', GenreController.deleteGenre)

module.exports = router