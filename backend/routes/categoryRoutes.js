import express from 'express'
const router = express.Router()
import {
    getCategories,
    getCategoryById
} from '../controllers/categoryController.js'


router
    .route('/')
    .get(getCategories)


router
    .route('/:id')
    .get(getCategoryById)

export default router