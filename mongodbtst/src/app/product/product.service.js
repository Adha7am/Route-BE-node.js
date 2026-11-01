const productRepo = require('./product.repo')

async function createProduct(productData){
    const product = await productRepo.createProduct(productData)
    console.log(product);
    
    if (!product) throw new Error('product not created for some reason')  

    return product
}

module.exports = {createProduct}