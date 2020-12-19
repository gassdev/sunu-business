import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { useRouteMatch } from 'react-router-dom'
import { logout } from '../actions/userActions'

const Header = () => {
    const match = useRouteMatch()

    const isActive = (path) => {
        return match.path === path
    }

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <div className="p-1" id="topHeader">
                <Container>
                    <Row>
                        { }
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
                        <Nav>
                            <LinkContainer style={{ fontSize: '1.09375rem' }} to="/shop">
                                <Nav.Link active={isActive('/shop')}>Tous nos produits</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <LinkContainer to="/cart">
                                    <Nav.Link active={isActive('/cart')}><i className="fas fa-shopping-cart"></i> Panier</Nav.Link>
                                </LinkContainer>
                                {userInfo ? (
                                    <NavDropdown title={userInfo.firstName + " " + userInfo.lastName} id='username'>
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>Profil</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Se déconnecter</NavDropdown.Item>
                                    </NavDropdown>
                                ) : (<>
                                    <LinkContainer to="/login">
                                        <Nav.Link active={isActive('/login')}><i className="fas fa-user"></i> Connectez-vous</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/register'>
                                        <Nav.Link active={isActive('/register')}><i className="fas fa-user-plus"></i> Créez un compte</Nav.Link>
                                    </LinkContainer>
                                </>)}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </header>
    )
}

export default Header
