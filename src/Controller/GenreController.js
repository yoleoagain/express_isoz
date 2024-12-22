const pool = require('../Database')
const validators = require('../utils/validators')

class GenreController {
    async getGenre(req, res) {
        try {
            const genres = await pool.query('SELECT * FROM genres')
            res.json(genres.rows)
        } catch (error) {
            console.log(error);
        }
    }

    async createGenre(req, res) {
        try {
            const genre = req.body
            if (validators.isValidGenre(genre)) {
                res.status(400).send({ message: 'Name and are required' })
            }
            const { name } = req.body

            const newGenre = await pool.query('INSERT INTO genres (name) VALUES ($1) RETURNING *', [name])
            res.json(newGenre.rows[0])
        } catch (error) {
            console.log(error);
        }
    }

    async updateGenre(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).send({ message: 'Id is required' })
            }

            const genre = req.body

            if (validators.isValidGenre(genre)) {
                res.status(400).send({ message: 'Name and email are required' })
            }
            
            const { name } = req.body
            const updatedUser = await pool.query('UPDATE genres SET name = $1 WHERE id = $2 RETURNING *', [name, id])
            res.json(updatedUser.rows[0])
        } catch (error) {
            console.log(error);
        }
    }

    async deleteGenre(req, res) {
        try {
            const { id } = req.params
            const deletedUser = await pool.query('DELETE FROM genres WHERE id = $1 RETURNING *', [id])
            res.json(deletedUser.rows[0])
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new GenreController()