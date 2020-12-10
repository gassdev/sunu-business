import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { activate } from '../actions/userActions'


const ActivatePage = ({ history, location, match }) => {

    const [values, setValues] = useState({
        token: match.params.token ? match.params.token : "",
        show: true
    })


    const { token, show } = values

    const dispatch = useDispatch()

    const userActivate = useSelector(state => state.userActivate)
    const { loading, error, userInfo } = userActivate

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, redirect, userInfo])

    const clickSubmit = event => {
        event.preventDefault()
        dispatch(activate(token))
        setValues({ ...values, token: "", show: true })
    }

    const activationLink = () => (
        <div className="text-center">
            <h6 className="py-3">Cliquez sur le bouton suivant pour activer votre compte.</h6>
            <button className="btn btn-outline-dark" onClick={clickSubmit}>
                Activez votre compte
            </button>
        </div>
    )

    return (
        <Container>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {show && activationLink()}
        </Container>

    )
}

export default ActivatePage
