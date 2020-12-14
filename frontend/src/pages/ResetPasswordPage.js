import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

const ResetPasswordPage = ({ location, history, match }) => {

    const [newPassword, setNewPassword] = useState('')
    const [token, setToken] = useState('')
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
        setToken(match.params.token)
    }, [history, redirect, userInfo, match.params.token])

    const clickSubmit = event => {
        event.preventDefault()
        setLoading(true)
        axios({
            method: 'PUT',
            url: '/api/users/reset-password',
            data: { newPassword, resetPasswordLink: token }
        })
            .then(response => {
                console.log('FORGOT PASSWORD SUCCESS', response)
                setSuccess(response.data.message)
                setNewPassword('')
                setError(null)
                setLoading(false)
            })
            .catch(error => {
                console.log('FORGOT PASSWORD ERROR', error.response.data)
                setError(error.response.data.message ? error.response.data.message.newPassword : error.response.data.error)
                setSuccess(null)
                setLoading(false)
            })
    }

    return (
        <FormContainer>
            <h4>Réinitialiser Votre Mot de Passe</h4>
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>{success} <Link to="/login">Connectez-vous</Link></Message>}
            {loading && <Loader />}
            <Form onSubmit={clickSubmit}>
                <Form.Group controlId='newPassword'>
                    <Form.Label>Mot de Passe</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Entrer votre nouveau mot de passe'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' className="btn-dark">
                    Réinitialiser Votre Mot de Passe
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ResetPasswordPage
