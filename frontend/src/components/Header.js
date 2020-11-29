import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar, Row } from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <div className="p-1" id="topHeader">
                <Container>
                    <Row>
                        <div className="col-12 text-right">
                            <a className="p-1" href="tel:+22133987654321"> <i className="fas fa-phone"></i> +(221) 33987654321 </a>
                            <a className="p-1" href="mailto:contact@sunubusiness.com"> <i className="fas fa-envelope"></i> contact@sunubusiness.com </a>
                        </div>
                    </Row>
                </Container>
            </div>
            <div id="bottomHeader">
                <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                    <Container fluid style={{ 'width': '80%' }}>
                        <LinkContainer to="/">
                            <Navbar.Brand>Sunu-Business</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <LinkContainer to="/cart">
                                    <Nav.Link><i className="fas fa-shopping-cart"></i> Panier</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user"></i> Se Connecter</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </header>
    )
}

export default Header
