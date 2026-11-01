const productService = require('./product.service')

async function createProduct(req, res, next) {
    try {
        // const {productData} = req.body
        console.log(req.body);
        
        const product = await productService.createProduct(req.body)    

        res.status(201).json({
            message : 'created product successfully',
            success : true,
            data : product
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {createProduct}