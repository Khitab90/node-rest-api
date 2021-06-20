const Product = require('../models/productModel')

const { getPostData } = require('../utils')

//@desc     Gets all Product
//@route    GET /api/products
async function getProducts(req, res) { 
    try {
        const products = await Product.findAll() //fetch products, findall func returns promise
        
            res.writeHead(200, { 'Contect-Type': 'application/json'})//array of JS objects
            res.end(JSON.stringify(products))
        //so we have to stringify, Express does this for you
    } catch (error) {
        console.log(error)
    }
}

//@desc     Gets single Product
//@route    GET /api/products/:id
async function getProduct(req, res, id) { //calls model function which returns promise
    try {
        const product = await Product.findById(id) //fetch product, find func returns promise
        
        if(!product) {
            res.writeHead(404, { 'Contect-Type': 'application/json'})//array of JS objects
            res.end(JSON.stringify({ message: 'Prduct Not Found'}))
        } else {
            res.writeHead(200, { 'Contect-Type': 'application/json'})//array of JS objects
            res.end(JSON.stringify(product))
        }       
    } catch (error) {
        console.log(error)
    }
}

//@desc     Create a Product
//@route    POST /api/products
async function createProduct(req, res) { 
    try {
        

        const body = await getPostData(req)

        const { title, description, price} = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Product.create(product)

        res.writeHead(201, { 'Content-Type': 'application/json'})
        return res.end(JSON.stringify(newProduct))

        

    } catch (error) {
        console.log(error)
    }
}

//@desc     Update a Product
//@route    PUT /api/products/id
async function updateProduct(req, res, id) { 
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Contect-Type': 'application/json'})//array of JS objects
            res.end(JSON.stringify({ message: 'Prduct Not Found'}))
        } else {
            const body = await getPostData(req)

            const { title, description, price} = JSON.parse(body)

            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Product.update(id, productData)

            res.writeHead(200, { 'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updProduct))
        }

    } catch (error) {
        console.log(error)
    }
}

//@desc     Deletes single Product
//@route    DELETE /api/products/:id
async function deleteProduct(req, res, id) { //calls model function which returns promise
    try {
        const product = await Product.findById(id) //fetch product, find func returns promise
        
        if(!product) {
            res.writeHead(404, { 'Contect-Type': 'application/json'})//array of JS objects
            res.end(JSON.stringify({ message: 'Product Not Found'}))
        } else {
            await Product.remove(id)
            res.writeHead(200, { 'Contect-Type': 'application/json'})//array of JS objects
            res.end(JSON.stringify({ message: `Product ${id} removed`}))
        }       
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}