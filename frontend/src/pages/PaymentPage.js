import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentPage = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Cash')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Méthode de Paiement</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Payer par</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Cash"
                            id="Cash"
                            name="paymentMethod"
                            value='Cash'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        {/* <Form.Check
                            type="radio"
                            label="Paydunya"
                            id="Paydunya"
                            name="paymentMethod"
                            value='Paydunya'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check> */}
                    </Col>
                </Form.Group>

                <Button type='submit' className='btn-dark'>
                    Continuer
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentPage
