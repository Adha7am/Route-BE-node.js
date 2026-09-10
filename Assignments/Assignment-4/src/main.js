const {config} = require('dotenv');
config();
const express = require('express');
const app = express();
const {Pool} = require('pg');

function sendRes(res, statusCode, msg, data = undefined) {
    return res.status(statusCode).json({message: msg, success: statusCode < 400, data: data})
}

const pool = new Pool({
    host: process.env.PHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,  // || process.env.USER
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE, // || user
})

app.use(express.json())

//====================
//SUPPLIERS
//Add a supplier
app.post("/supplier", async (req, res) => {
    const {name, contactNumber} = req.body
    if (!name || !contactNumber) {
        throw new Error('name and contact number are required')
    }
    const {rows} = await pool.query(`INSERT INTO suppliers (name, contact_number)
                                     VALUES ($1, $2) RETURNING id`, [name, contactNumber]);
    // res.status(201).json({message : 'created supplier successfully', success:true, data: rows[0]})
    sendRes(res, 201, 'created supplier successfully', rows[0])
})

//Get all suppliers
app.get("/supplier", async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM suppliers')
    // res.status(200).json({message : 'retrieved suppliers successfully', success: true, data: rows})
    sendRes(res, 200, 'retrieved suppliers successfully', rows)
})

//Delete a supplier
app.delete("/supplier", async (req, res) => {
    const {id} = req.body

    const result = await pool.query(`DELETE
                                     FROM suppliers
                                     WHERE id = $1`, [id])
    // res.status(200).json({message : 'deleted supplier successfully', success: true, data: result})
    if (result.rowCount === 0) {
        throw new Error('user not found')
    }
    sendRes(res, 200, 'deleted supplier successfully')
})

//Update supplier details
app.patch("/supplier/:id", async (req, res) => {

    //allowed fields to update
    const fieldsMap = {
        name: "name",
        contactNumber: "contact_number"
    }

    //fields user wants to update after filtering out unauthorized fields
    const updates = Object.keys(req.body).filter((field) => field in fieldsMap)
    if (updates.length === 0) {
        throw new Error('no valid fields to update')
    }

    //Update clause
    const clause = updates.map((u, i) => `${fieldsMap[u]} = $${i + 1}`).join(',')
    const values = updates.map((u) => req.body[u])
    values.push(req.params.id)
    const {rows, rowCount} = await pool.query(`UPDATE suppliers
                                               SET ${clause}
                                               WHERE id = $${updates.length + 1} RETURNING *`, values);
    if (rowCount === 0) {
        throw new Error('supplier not found')
    }
    sendRes(res, 200, 'supplier updated successfully', rows[0])
})

//============================
//PRODUCTS
//Add product
app.post("/product", async (req, res) => {
    const {name, price, stock, supplierId} = req.body;
    const {rows} = await pool.query(`INSERT INTO products(name, price, stock, supplier_id)
                                     VALUES ($1, $2, $3, $4) RETURNING name, id`, [name, price, stock, supplierId])
    sendRes(res, 201, 'created product successfully', rows[0])
})

//Get all products
app.get("/product", async (req, res) => {
    const {rows} = await pool.query(`SELECT *
                                     FROM products`)
    sendRes(res, 200, 'retrieved products successfully', rows)
})

//Get product by id
app.get("/product/:id", async (req, res) => {
    const {id} = req.params
    const {rows} = await pool.query(`SELECT *
                                     FROM products
                                     WHERE id = $1`, [id])
    if (!rows[0]) {
        throw new Error('cannot find product')
    }

    sendRes(res, 200, 'retrieved product successfully', rows[0])
})

//Update a product
app.patch("/product/:id", async (req, res) => {

    //allowed fields to update
    const fieldsMap = {
        name: "name",
        price: "price",
        stock: "stock",
        supplierId: "supplier_id"
    }

    //fields user wants to update after filtering out unauthorized fields
    const updates = Object.keys(req.body).filter((field) => field in fieldsMap)
    if (updates.length === 0) {
        throw new Error('no valid fields to update')
    }

    //Update clause
    const clause = updates.map((u, i) => `${fieldsMap[u]} = $${i + 1}`).join(',')
    const values = updates.map((u) => req.body[u])
    values.push(req.params.id)

    const {rows, rowCount} = await pool.query(`UPDATE products
                                               SET ${clause}
                                               WHERE id = $${updates.length + 1} RETURNING *`, values);
    if (rowCount === 0) {
        throw new Error('product not found')
    }
    sendRes(res, 200, 'product updated successfully', rows[0])

})

//Delete a product
app.delete("/product/:id", async (req, res) => {
    const {rows, rowCount} = await pool.query(`DELETE
                                               FROM products
                                               WHERE id = $1`, [req.params.id]);
    if (rowCount === 0) throw new Error('cannot find product');

    sendRes(res, 200, 'deleted product successfully');
})

//======================================
//SALES
//Record a sale
app.post("/sale", async (req, res) => {
    const {productId, quantity} = req.body
    const {rows} = await pool.query(`INSERT INTO sales (product_id, quantity)
                                     VALUES ($1, $2)
                                         RETURNING id`, [productId, quantity])
    sendRes(res, 201, 'sale recorded successfully', rows[0])
})

//Get sales for a specific product
app.get("/product/:id/sales", async (req, res) => {
    const {id} = req.params;
    const {rows} = await pool.query(`SELECT * FROM sales WHERE product_id = $1`, [id]);
    sendRes(res, 200, 'retrieved sales successfully', rows);
})

//Get all sales
app.get("/sale", async (req, res) => {
    const {rows} = await pool.query(`SELECT *
                                     FROM sales`)
    sendRes(res, 200, "retrieved all sales successfully", rows)
})

//global error handler
app.use((err, req, res, next) => {
    sendRes(res, 404, err.message, undefined, false)
})

app.listen(8080, () => console.log('Listening on 8080'));
