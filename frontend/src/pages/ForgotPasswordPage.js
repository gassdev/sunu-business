import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ForgotPasswordPage = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, redirect, userInfo])

    const clickSubmit = event => {
        event.preventDefault()
        setLoading(true)
        axios({
            method: 'PUT',
            url: '/api/users/forgot-password',
            data: { email }
        })
            .then(response => {
                console.log('FORGOT PASSWORD SUCCESS', response)
                setSuccess(response.data.message)
                setEmail('')
                setError(null)
                setLoading(false)
            })
            .catch(error => {
                console.log('FORGOT PASSWORD ERROR', error.response.data)
                setError(error.response.data.message ? error.response.data.message.email : error.response.data.error)
                setSuccess(null)
                setLoading(false)
            })
    }

    return (
        <FormContainer>
            <h4>Demande de Réinitialiser votre mot de passe</h4>
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>{success}</Message>}
            {loading && <Loader />}
            <Form onSubmit={clickSubmit}>
                <Form.Group controlId='email'>
                    <Form.Label>Adresse e-mail</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Entrer votre email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' className="btn-dark">
                    Demande de Réinitialiser votre mot de passe
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ForgotPasswordPage
