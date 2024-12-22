const pool = require('../Database')
const validators = require('../utils/validators')

class UserController {
    async getUsers(req, res) {
        try {
            const users = await pool.query('SELECT * FROM users')
            res.json(users.rows)
        } catch (error) {
            console.log(error);
        }
    }

    async createUser(req, res) {
        try {
            const user = req.body
            if (validators.isValidUser(user)) {
                res.status(400).send({ message: 'Name and email are required' })
            }
            const { name, email } = req.body

            const newUser = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email])
            res.json(newUser.rows[0])
        } catch (error) {
            console.log(error);
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).send({ message: 'Id is required' })
            }

            const user = req.body

            if (validators.isValidUser(user)) {
                res.status(400).send({ message: 'Name and email are required' })
            }
            
            const { name, email } = req.body
            const updatedUser = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id])
            res.json(updatedUser.rows[0])
        } catch (error) {
            console.log(error);
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params
            const deletedUser = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id])
            res.json(deletedUser.rows[0])
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserController()