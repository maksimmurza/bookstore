import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
// import { BookHalf } from 'react-bootstrap-icons'
import { LinkContainer } from "react-router-bootstrap";
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";
import "./Header.scss";

const Header = () => {
	return (
		<header>
			<Navbar bg="light" expand="lg" collapseOnSelect className="py-1">
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand className="link-to-main">
							<div className="logo-container">
								<AnimatedLogo></AnimatedLogo>
							</div>
							<span className="pl-2">Book Shop</span>
						</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<LinkContainer to="/cart">
								<Nav.Link className="pr-4">
									<i className="fas fa-shopping-cart pr-2"></i>
									Cart
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/login">
								<Nav.Link className="">
									<i className="fas fa-user pr-2"></i>Sign In
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
