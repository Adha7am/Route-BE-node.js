const express = require('express')
const productRouter = require('./app/product/product.route')

const app = express();

app.use(express.json())

app.use('/product', productRouter)

app.use((err, req, res, next) => {
    res.status(400).json({
        message : err,
        stack : err.stack
    })
})


app.listen(3000, () => console.log('listening on port 3000'))