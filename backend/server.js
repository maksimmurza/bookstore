import express from 'express';
import colors from 'colors'
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import productRoutes from './routes/productsRoutes.js'

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
    res.send('API running');
});

app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.black.bold.bgYellow))