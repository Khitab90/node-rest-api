//entry point

//bring http module, comes with nodejs, express uses under the hood
const http = require('http')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./controllers/productController')

//get data - method, url, etc from request
//respond w/ whatever we want to put in our body with res obj
const server = http.createServer((req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res)// (req, res) comes from createServer(req, server)
    } else if(req.url.match(/^\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3] //splits url string into array and gest index[2] = id
        getProduct(req, res, id)
    } else if(req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res)
    } else if(req.url.match(/^\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    } else if(req.url.match(/^\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Route not found'}))
    }
})



//check if there is an env variable or 5001
const PORT = process.env.PORT || 5001

server.listen(PORT, () => console.log('Server running on port ${PORT}'))
