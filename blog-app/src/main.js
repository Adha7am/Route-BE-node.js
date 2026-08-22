const express = require('express')
const authRouter = require('./app/auth/auth.route')

const app = express()

app.use(express.json())
app.use("/auth", authRouter)

app.use((err, _req, res, _next) => {
    res.status(404).json({"message" : err.message})
})
app.listen(3000)