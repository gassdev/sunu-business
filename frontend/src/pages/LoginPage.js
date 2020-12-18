import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginPage = ({ history, location }) => {
    const [values, setValues] = useState({
        "email": '',
        "password": '',
    })

    const { email, password } = values

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    return (
        <FormContainer>
            <h1>Se Connecter</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Adresse e-mail</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Entrer votre email'
                        value={email}
                        onChange={handleChange('email')}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Entrer Votre Mot de passe'
                        value={password}
                        onChange={handleChange('password')}
                        required
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' className="btn-dark">
                    Se Connecter
                </Button>
            </Form>

            <Row className='py-3'>
                <Col md={6}>
                    Nouvel Utilisateur? <Link style={{ textDecoration: 'none' }} to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Créez un compte
                    </Link>
                </Col>
                <Col>
                    <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-dark">
                        Mot de passe oublié?
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginPage
