import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'
import connectDB from './config/db.js'

import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})


app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)

app.use(notFound)

// Error handler
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))