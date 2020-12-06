import express from 'express'
const router = express.Router()
import {
    // getProducts,
    list,
    listCategories,
    listBySearch,
    getProductById
} from '../controllers/productController.js'


// router
//     .route('/')
//     .get(getProducts)
router
    .route('/')
    .get(list)

router.get('/categories', listCategories)

router.post("/by/search", listBySearch);

router
    .route('/:id')
    .get(getProductById)

export default router