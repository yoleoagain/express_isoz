require('dotenv').config()
const express = require('express')
const app = express()
const createTables = require('./Database/setup')
// Routes
const GreetRoutes = require('./Routes/GreetRoutes')
const LocalUserRoutes = require('./Routes/LocalUserRoutes')
const UserRoutes = require('./Routes/UserRoutes')
const PostRoutes = require('./Routes/PostRoutes')

app.use(express.json())

// Routes
app.use(GreetRoutes)
app.use(LocalUserRoutes)
app.use(UserRoutes)
app.use(PostRoutes)

async function Init() {
    try {
        await createTables()
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(`Init error: ${error.message}`);
    }
}
    
Init()
