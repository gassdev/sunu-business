import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingPage = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [district, setDistrict] = useState(shippingAddress.district || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country] = useState('Sénégal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress(
            {
                address,
                city,
                district,
                postalCode,
                country
            }
        ))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Adresse de Livraison</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Entrer Votre Adresse'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>Ville</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Entrer Votre Ville'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <Form.Group controlId='district'>
                    <Form.Label>Quartier</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Quartier'
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Code Postal</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Code Postal'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                        as="select"
                        disabled
                        defaultValue={country}
                    >
                        <option defaultValue={country}>SENEGAL</option>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' className='btn-dark'>
                    Continuer
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingPage
