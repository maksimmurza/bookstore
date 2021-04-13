import React from 'react'
import { Navbar, Nav, Container} from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg="light" expand="lg" collapseOnSelect>
                <Container>
                <Navbar.Brand href="/home"><b>Co<i>MERN</i>ce</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto">
                    <Nav.Link href="/cart" className='pr-4'><i className='fas fa-shopping-cart pr-2'></i>Cart</Nav.Link>
                    <Nav.Link href="/login" className=''><i className='fas fa-user pr-2'></i>Sign In</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
