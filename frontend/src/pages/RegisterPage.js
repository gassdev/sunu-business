import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterPage = ({ history, location }) => {
    const [values, setValues] = useState({
        "firstName": '',
        "lastName": '',
        "email": '',
        "password": '',
        "confirmPassword": '',
        "message": null,
    })

    const { firstName, lastName, email, password, confirmPassword, message } = values

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, successMsg } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'



    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setValues({ ...values, message: "Les Mots de passe ne correspondent pas." })
        } else {
            dispatch(register(firstName, lastName, email, password))
            setValues({ ...values, firstName: '', lastName: '', email: '', password: '', confirmPassword: '', message: null })
        }
    }


    return (
        <FormContainer>
            <h1>Créez votre compte</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && typeof (error) !== 'object' ? <Message variant='danger'>{error}</Message> : null}
            {loading && <Loader />}
            {successMsg && <Message variant="success">{successMsg}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='firstName'>
                    <Form.Label>Prénom</Form.Label>
                    {error && error.firstName && <Message variant='danger'>{error.firstName}</Message>}
                    <Form.Control
                        type='text'
                        placeholder='Entrer Votre Prénom'
                        value={firstName}
                        onChange={handleChange('firstName')}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='lastName'>
                    <Form.Label>Nom</Form.Label>
                    {error && error.lastName && <Message variant='danger'>{error.lastName}</Message>}
                    <Form.Control
                        type='text'
                        placeholder='Entrer Votre Nom'
                        value={lastName}
                        onChange={handleChange('lastName')}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Adresse e-mail</Form.Label>
                    {error && error.email && <Message variant='danger'>{error.email}</Message>}
                    <Form.Control
                        type='email'
                        placeholder='Entrer votre email'
                        value={email}
                        onChange={handleChange('email')}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Mot de passe</Form.Label>
                    {error && error.password && <Message variant='danger'>{error.password}</Message>}
                    <Form.Control
                        type='password'
                        placeholder='Entrer Votre Mot de passe'
                        value={password}
                        onChange={handleChange('password')}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirmez Votre Mot de passe</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirmez Votre Mot de passe'
                        value={confirmPassword}
                        onChange={handleChange('confirmPassword')}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' className="btn-dark">
                    S'inscrire
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Avez-vous un compte? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Connectez-Vous
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterPage
