import express from 'express';
import products from './data/products.json';
import colors from 'colors'
import dotenv from 'dotenv';
import connectDB from './config/db.js'

dotenv.config();

connectDB();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.black.bold.bgYellow))