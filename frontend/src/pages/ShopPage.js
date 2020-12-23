import { toArray } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listCategories } from '../actions/categoryActions'
import { getFilteredProducts } from '../actions/productActions'
import Checkbox from '../components/Checkbox'
import Product from '../components/Product'
import RadioBox from '../components/RadioBox'
import { prices } from '../utils/FixedPrices'


const ShopPage = () => {

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })

    const [limit] = useState(6)
    const [skip] = useState(0)
    const [error, setError] = useState(null)
    const [filteredResults, setFilteredResults] = useState([])

    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const { categories } = categoryList

    const loadFilteredResults = useCallback((newFilters) => {
        // console.log(newFilters)
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data)
                // setSize(data.size)
                // setSkip(0)
            }
        })
    }, [skip, limit])

    useEffect(() => {
        dispatch(listCategories())
        loadFilteredResults(skip, limit, myFilters.filters)
    }, [dispatch, limit, skip, myFilters.filters, loadFilteredResults])

    const handleFilters = (filters, filterBy) => {
        // console.log('SHOP PAGE', filters, filterBy)
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters

        if (filterBy === "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }

        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for (const key in data) {
            if (data[key]._id === Number(value)) {
                array = data[key].array

            }
        }
        return array
    }

    return (
        <>
            <Row>
                <Col lg={4}>
                    <h4>Filter par catégories</h4>
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilters={filters => handleFilters(filters, "category")}
                        />
                    </ul>

                    <h4>Filter par prix</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters => handleFilters(filters, "price")}
                        />
                    </div>
                </Col>
                <Col lg={8}>
                    <Row>
                        {toArray(filteredResults.products).map(product => (
                            <Col key={product._id} sm={12} md={6} lg={6} xl={4} className='align-items-stretch d-flex'>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default ShopPage
