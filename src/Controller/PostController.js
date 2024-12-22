const pool = require('../Database')
const validators = require('../utils/validators')

class PostController {
    async getPosts(req, res) {
        try {
            const posts = await pool.query('SELECT * FROM posts')
            res.json(posts.rows)
        } catch (error) {
            console.log(error);
        }
    }

    async createPost(req, res) {
        try {
            const { user_id: userId } = req.params
            const post = req.body

            if (!userId) {
                res.status(400).send({ message: 'userId is required' })
            }

            if (validators.isValidPost(post)) {
                res.status(400).send({ message: 'Body are required' })
            }
            const { body, title } = req.body

            const newPost = await pool.query('INSERT INTO posts (body, title, user_id) VALUES ($1, $2, $3) RETURNING *', [body, title, userId])
            res.json(newPost.rows[0])
        } catch (error) {
            console.log(error);
        }
    }

    async updatePost(req, res) {
        try {
            const { user_id, id: postId } = req.params
            if (!user_id || !postId) {
                res.status(400).send({ message: 'user_id and postId is required' })
            }

            const post = req.body

            if (validators.isValidPost(post)) {
                res.status(400).send({ message: 'Body are required' })
            }
            
            const { body, title } = req.body
            const updatedUser = await pool.query('UPDATE posts SET body = $1, title = $2 WHERE id = $3 AND user_id = $4 RETURNING *', [body, title, postId, user_id])
            res.json(updatedUser.rows[0])
        } catch (error) {
            console.log(error);
        }
    }

    async deletePost(req, res) {
        try {
            const { user_id, id: postId } = req.params
            const deletedUser = await pool.query('DELETE FROM posts WHERE id = $1 and user_id = $2 RETURNING *', [postId, user_id])
            res.json(deletedUser.rows[0])
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new PostController()