// @ts-check
const validators = require('../utils/validators')
const Validators = require('../utils/validators')
const { readFile, writeFile } = require('fs/promises')
const router = require('express').Router();
const pathToDB = './src/local-db.json'

router.get('/users/local', async (req, res) => {
    try {
        res.send(await readFile(pathToDB, 'utf8'))
    } catch (error) {
        console.log(error);
        res.send([])
    }
})

router.post('/users/local', async (req, res) => {
    try {
        const user = req.body
        const users = JSON.parse(await readFile(pathToDB, 'utf8'))
        const requiredMessage = 'Invalid user data - name, email is required'
        
        if (validators.isValidUser(user)) {
            res.status(400).send({ message: requiredMessage })
        }

        if (!Validators.validateEmail(user.email)) {
            res.status(400).send({ message: 'Wrong email' })
        }

        const nextId = Math.max(...users.map(({ id }) => id)) + 1
        const newUser = { ...user, id: nextId }
        users.push(newUser)

        await writeFile(pathToDB, JSON.stringify(users, null, 2), 'utf8')

        res.status(201).send(newUser)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

module.exports = router;