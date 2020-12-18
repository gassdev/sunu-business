import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Produit non trouvé')
    }
})


/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */
// @desc Fetch all products
// @route GET /api/products
// @access Public
const list = asyncHandler(async (req, res) => {
    let order = req.query.order ? req.query.order : 'desc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? Number(req.query.limit) : 10

    const products = await Product.find()
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)

    res.json(products)

})



// @desc Fetch all categories which have a product
// @route GET /api/products/categories
// @access Public
const listCategories = asyncHandler(async (req, res) => {
    const categories = await Product.distinct("category", {})

    res.json(categories)
})




/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
// @desc Fetch products by search
// @route GET /api/products/by/search
// @access Public
const listBySearch = asyncHandler(async (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    const products = await Product.find(findArgs)
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)

    res.json({
        size: products.length,
        products
    })
})


export {
    getProducts,
    getProductById,
    list,
    listCategories,
    listBySearch,
}