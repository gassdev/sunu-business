import React, { useState } from 'react'
import {
    Button,
    Row,
    Col,
    ListGroup,
    Image,
    Card
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'


const PlaceOrderPage = () => {
    const cart = useSelector(state => state.cart)

    const placeOrderHandler = () => {
        console.log('order')
    }

    // Calculate prices
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0)

    cart.shippingPrice = 1500

    cart.totalPrice = cart.itemsPrice + cart.shippingPrice

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Livraison</h2>
                            <p>
                                <strong>Adresse:</strong>
                                {cart.shippingAddress.city}, {' '} {cart.shippingAddress.district ? cart.shippingAddress.district : null} {' '} {cart.shippingAddress.address}, {cart.shippingAddress.postalCode ? cart.shippingAddress.postalCode : null},{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payer par: </h2>
                            <strong>{cart.paymentMethod}</strong>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Détails Commande</h2>
                            {cart.cartItems.length === 0
                                ? <Message variant="danger">Votre panier est vide</Message>
                                : (
                                    <ListGroup variant="flush">
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link style={{ textDecoration: 'none' }} to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col>
                                                        {item.qty} x {item.price}F CFA = {item.qty * item.price}F CFA
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Récap Commande</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Produits</Col>
                                    <Col>{cart.itemsPrice}F CFA</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Livraison</Col>
                                    <Col>{cart.shippingPrice}F CFA</Col>
                                </Row>
                            </ListGroup.Item>
                            {/* <ListGroup.Item>
                                <Row>
                                    <Col>Taxe</Col>
                                    <Col>{cart.taxPrice}F CFA</Col>
                                </Row>
                            </ListGroup.Item> */}
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>{cart.totalPrice}F CFA</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="button" className="btn-block btn-dark" disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>Passer la Commande</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderPage
