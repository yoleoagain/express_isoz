const pool = require('.')

async function createTables (params) {
    try {
        const createUsersTable = `
           CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `
        const createPostsTable = `
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users (id) ON DELETE CASCADE, title VARCHAR(255) NOT NULL,
                body TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `
        const createAuthorTable = `
            CREATE TABLE IF NOT EXISTS authors (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `

        const createGenresTable = `
            CREATE TABLE IF NOT EXISTS genres (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `

        const createBooksTable = `
            DO $$ BEGIN
                CREATE TYPE bookstatus AS ENUM ('in_stock', 'sold', 'for_rent');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
            CREATE TABLE IF NOT EXISTS books (
                id SERIAL PRIMARY KEY,
                author_id INTEGER REFERENCES authors (id) ON DELETE CASCADE, name VARCHAR(255) NOT NULL,
                genre_id INTEGER REFERENCES genres (id) ON DELETE CASCADE,
                status bookstatus,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `

        await pool.query(createUsersTable)
        console.log('Users table created');
        
        await pool.query(createPostsTable)
        console.log('Post table created');

        await pool.query(createAuthorTable)
        console.log('Authors table created');

        await pool.query(createGenresTable)
        console.log('Genres table created');
        
        await pool.query(createBooksTable)
        console.log('Books table created');
    } catch (error) {
        console.log('Createding table errors:', error.message);
        
    }
}

module.exports = createTables