const {Router} = require('express')
const productsController = require('./product.controller')

const productRouter = new Router();

productRouter.post('/', productsController.createProduct)

module.exports = productRouter