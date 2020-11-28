import React from 'react'
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
                        <Navbar.Brand href="/">Sunu-Business</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i> Panier</Nav.Link>
                                <Nav.Link href="/login"><i className="fas fa-user"></i> Se Connecter</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </header>
    )
}

export default Header
