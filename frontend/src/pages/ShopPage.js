import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listCategories } from '../actions/categoryActions'
import Checkbox from '../components/Checkbox'
import RadioBox from '../components/RadioBox'
import { prices } from '../utils/FixedPrices'


const ShopPage = () => {

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })

    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const { categories } = categoryList

    useEffect(() => {
        dispatch(listCategories())
    }, [dispatch])

    const handleFilters = (filters, filterBy) => {
        // console.log('SHOP PAGE', filters, filterBy)
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters

        if (filterBy === "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }

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
                <Col lg={8}>{JSON.stringify(myFilters)}</Col>
            </Row>
        </>
    )
}

export default ShopPage
