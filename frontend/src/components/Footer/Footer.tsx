import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.scss'

const Footer = () => {
    return (
        <footer>
             <Container>
                <Row>
                    <Col className='col'>
                        <a href='https://github.com/maksimmurza/e-coMERNce'>e-coMERNce</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
