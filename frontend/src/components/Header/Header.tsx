import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
// import { BookHalf } from 'react-bootstrap-icons'
import { LinkContainer } from "react-router-bootstrap";
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";
import "./Header.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/actions/userActions";

const Header = () => {
	const { userInfo } = useAppSelector((state) => state.userLogin);
	const dispatch = useAppDispatch();

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg="light" expand="lg" collapseOnSelect>
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
							{userInfo ? (
								<NavDropdown
									title={userInfo.name}
									id="user-account"
								>
									<LinkContainer to="/profile">
										<NavDropdown.Item>
											Profile
										</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link className="">
										<i className="fas fa-user pr-2"></i>Sign
										In
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
