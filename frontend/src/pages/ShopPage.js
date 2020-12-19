import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listCategories } from '../actions/categoryActions'
import Checkbox from '../components/Checkbox'

const ShopPage = () => {

    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const { categories } = categoryList

    useEffect(() => {
        dispatch(listCategories())
    }, [dispatch])

    return (
        <>
            <Row>
                <Col lg={4}>
                    <h4>Filter par catégories</h4>
                    <ul>
                        <Checkbox categories={categories} />
                    </ul>
                </Col>
                <Col lg={8}>right</Col>
            </Row>
        </>
    )
}

export default ShopPage
