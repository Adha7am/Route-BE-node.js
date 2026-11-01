const db = require('../../common/db/mongodb')

async function createProduct (productData) {
    
    const product = await db.collection('products').insertOne(productData)
    return product

}

module.exports = {createProduct}