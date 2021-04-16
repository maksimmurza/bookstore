const express = require('express');
const products = require('./data/products.json')

const app = express();

app.get('/', (req, res) => {
    res.send('API running');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id.toString() === req.params.id)
    res.json(product);
});


app.listen(5000, console.log('Server is running on port 5000'))