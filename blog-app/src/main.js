const { config } = require('dotenv')
config();
const express = require('express')
const authRouter = require('./app/auth/auth.route.js')
const blogRouter = require('./app/blog/blog.route.js')

const app = express()

//parses request
app.use(express.json())

//routes
app.use("/auth", authRouter)
app.use('/blog', blogRouter)

//global error handler
app.use((err, _req, res, _next) => {
    res.status(400).json({ "message": err.message, success : false, stack: err.stack })
})

app.listen(3000)