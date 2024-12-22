const pool = require('../Database')
const validators = require('../utils/validators')

class AuthorController {
    async getAuthor(req, res) {
        try {
            const authors = await pool.query('SELECT * FROM authors')
            res.json(authors.rows)
        } catch (error) {
            console.log(error);
        }
    }

    async createAuthor(req, res) {
        try {
            const author = req.body
            if (validators.isValidAuthor(author)) {
                res.status(400).send({ message: 'Name and are required' })
            }
            const { name } = req.body

            const newAuthor = await pool.query('INSERT INTO authors (name) VALUES ($1) RETURNING *', [name])
            res.json(newAuthor.rows[0])
        } catch (error) {
            console.log(error);
        }
    }

    async updateAuthor(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).send({ message: 'Id is required' })
            }

            const author = req.body

            if (validators.isValidAuthor(author)) {
                res.status(400).send({ message: 'Name and email are required' })
            }
            
            const { name } = req.body
            const updatedUser = await pool.query('UPDATE authors SET name = $1 WHERE id = $2 RETURNING *', [name, id])
            res.json(updatedUser.rows[0])
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAuthor(req, res) {
        try {
            const { id } = req.params
            const deletedUser = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id])
            res.json(deletedUser.rows[0])
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AuthorController()