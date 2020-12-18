import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductsByArrival, listProductsBySell } from '../actions/productActions'

const HomePage = () => {

    const dispatch = useDispatch()

    const productListBySell = useSelector(state => state.productListBySell)
    const {
        loading: loadingBySell,
        error: errorBySell,
        products: productsBySell
    } = productListBySell

    const productListByArrival = useSelector(state => state.productListByArrival)
    const {
        loading: loadingByArrival,
        error: errorByArrival,
        products: productsByArrival
    } = productListByArrival


    useEffect(() => {
        dispatch(listProductsBySell())
        dispatch(listProductsByArrival())
    }, [dispatch])


    return (
        <>
            <h1>Les plus récents</h1>
            {loadingByArrival ?
                <Loader /> :
                errorByArrival ?
                    <Message variant="danger">{errorByArrival}</Message> : (
                        <Row>
                            {productsByArrival.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3} className='align-items-stretch d-flex'>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                    )
            }

            <h1>Les plus vendus</h1>
            {loadingBySell ?
                <Loader /> :
                errorBySell ?
                    <Message variant="danger">{errorBySell}</Message> : (
                        <Row>
                            {productsBySell.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3} className='align-items-stretch d-flex'>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                    )
            }
        </>
    )
}

export default HomePage
