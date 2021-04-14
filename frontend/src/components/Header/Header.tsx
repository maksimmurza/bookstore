import React from 'react'
import { Navbar, Nav, Container} from 'react-bootstrap'
// import { BookHalf } from 'react-bootstrap-icons'
import {LinkContainer} from 'react-router-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg="light" expand="lg" collapseOnSelect>
                <Container>
                  <LinkContainer to="/">
                   <Navbar.Brand>
                  {/* <BookHalf width={40} height={40} className='pr-2'></BookHalf>  */}
                  Book Shop
                </Navbar.Brand>
                  </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto">
                  <LinkContainer to="/cart">
                    <Nav.Link className='pr-4'><i className='fas fa-shopping-cart pr-2'></i>Cart</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link className=''><i className='fas fa-user pr-2'></i>Sign In</Nav.Link>
                  </LinkContainer>
                  </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
