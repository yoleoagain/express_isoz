const pool = require('../Database')
const validators = require('../utils/validators')

class BooksController {
    async getBooks(req, res) {
        try {
            const books = await pool.query('SELECT * FROM books')
            res.json(books.rows)
        } catch (error) {
            console.log(error);
        }
    }

    async createBook(req, res) {
        try {
            const { author_id } = req.params

            if (validators.isValidBook(req.body)) {
                res.status(400).send({ message: 'Fields are required' })
            }
            const { genre_id, status, name } = req.body

            const newBook = await pool.query('INSERT INTO books (name, author_id, genre_id, status) VALUES ($1, $2, $3, $4) RETURNING *', [name, author_id, genre_id, status])
            res.json(newBook.rows[0])
        } catch (error) {
            console.log(error);
        }
    }

    async updateBook(req, res) {
        try {
            const { author_id, id: bookId } = req.params
            if (!author_id || !bookId) {
                res.status(400).send({ message: 'author_id and bookId is required' })
            }

            const book = req.body

            if (validators.isValidBook(book)) {
                res.status(400).send({ message: 'Body are required' })
            }
            
            const {  genre_id, status, name } = req.body
            const updatedUser = await pool.query('UPDATE books SET name = $1, author_id = $2, genre_id = $3, status = $4, WHERE id = $3 AND author_id = $2 RETURNING *', [name, author_id, genre_id, status])
            res.json(updatedUser.rows[0])
        } catch (error) {
            console.log(error);
        }
    }

    async deleteBook(req, res) {
        try {
            const { author_id, id: bookId } = req.params
            const deletedUser = await pool.query('DELETE FROM books WHERE id = $1 and author_id = $2 RETURNING *', [bookId, author_id])
            res.json(deletedUser.rows[0])
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new BooksController()