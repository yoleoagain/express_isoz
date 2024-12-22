const router = require('express').Router()
const UserController = require('../Controller/UserController')

router.get('/users', UserController.getUsers)
router.post('/users', UserController.createUser)
router.put('/users/:id', UserController.updateUser)
router.delete('/users/:id', UserController.deleteUser)

module.exports = router