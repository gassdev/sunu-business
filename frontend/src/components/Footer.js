import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer className="full-footer">
            <Container className="top-footer p-md-3 p-1">
                <Row>
                    <Col md={3} className="pl-4 pr-4">
                        <p>SUNU-BUSINESS</p>
                        <a style={{ "color": "silver" }} className="p-1" href="/#"><i className="fab fa-2x fa-facebook-square"></i></a>
                        <a style={{ "color": "silver" }} className="p-1" href="/#"><i className="fab fa-2x fa-google-plus-square"></i></a>
                        <a style={{ "color": "silver" }} className="p-1" href="/#"><i className="fab fa-2x fa-twitter-square"></i></a>
                        <a style={{ "color": "silver" }} className="p-1" href="/#"><i className="fab fa-2x fa-instagram"></i></a>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="bottom-footer pt-2">
                <Row>
                    <Col className="text-center">
                        <p>Copyright &copy; 2021 - Sunu-Business All rights reserved</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
