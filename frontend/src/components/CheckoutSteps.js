import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to="/login">
                        <Nav.Link>Se Connecter</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Se Connecter</Nav.Link>}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to="/shipping">
                        <Nav.Link>Livraison</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Livraison</Nav.Link>}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/payment">
                        <Nav.Link>Paiement</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Paiement</Nav.Link>}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to="/placeorder">
                        <Nav.Link>Passer la commande</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Passser la commande</Nav.Link>}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
