import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, UpdateUserProfile } from '../actions/userActions'

const ProfilePage = ({ history, location }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)




    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.firstName) {
                dispatch(getUserDetails('profile'))
            } else {
                setFirstName(user.firstName)
                setLastName(user.lastName)
                setEmail(user.email)
            }
        }
        if (success) {
            setFirstName(userInfo.firstName)
            setLastName(userInfo.lastName)
            setPassword('')
            setConfirmPassword('')
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Les Mots de passse ne correspondent pas')
            setSuccessMessage(null)
        } else {
            dispatch(UpdateUserProfile({ id: user._id, firstName, lastName, email, password }))
            setSuccessMessage('Profil modifié avec succés')
            setMessage(null)
        }
    }


    return <Row>
        <Col md={9}><h2>Historique d'Achats</h2></Col>
        <Col md={3}>
            <h2>Profil d'utilisateur</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {successMessage && <Message variant='success'>{successMessage}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='firstName'>
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Entrer Votre Prénom'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='lastName'>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Entrer Votre Nom'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Adresse e-mail</Form.Label>
                    <Form.Control
                        type='email'
                        defaultValue={email}
                        disabled
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Mot de passe'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirmer votre Mot de passe'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='dark'>
                    Enregistrer
            </Button>
            </Form>
        </Col>
    </Row>
}

export default ProfilePage
