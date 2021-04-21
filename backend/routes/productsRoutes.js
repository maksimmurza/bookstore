import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const routes = express.Router()

routes.get('/', asyncHandler( async (req, res) => {
    const products = await Product.find({})
    res.json(products); 
}));

routes.get('/:id', asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id).catch((error) => {
        res.status(404)
        throw new Error('Product not found')
    })
    
    res.json(product)
    
}));

export default routes