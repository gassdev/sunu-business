import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listCategories } from '../actions/categoryActions'
import Checkbox from '../components/Checkbox'

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
        setMyFilters(newFilters)
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
                </Col>
                <Col lg={8}>{JSON.stringify(myFilters)}</Col>
            </Row>
        </>
    )
}

export default ShopPage
