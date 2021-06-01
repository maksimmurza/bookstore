import React, { useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Header.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/actions/userActions";
import { userDetails } from "../../redux/actions/userActions";
import SearchBox from "../SearchBox/SearchBox";

const Header = () => {
	const { userInfo } = useAppSelector((state) => state.userLogin);
	const { user } = useAppSelector((state) => state.userDetails);
	const dispatch = useAppDispatch();

	const logoutHandler = () => {
		dispatch(logout());
	};

	useEffect(() => {
		if (userInfo) {
			dispatch(userDetails("profile", userInfo.token));
		}
	}, [dispatch, userInfo]);

	return (
		<header>
			<Navbar bg="light" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand className="link-to-main">
							<div className="logo-container"></div>
							<span className="pl-2">Book Shop</span>
						</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<SearchBox></SearchBox>
						<Nav className="ml-auto">
							<LinkContainer to="/cart">
								<Nav.Link className="pr-4">
									<i className="fas fa-shopping-cart pr-2"></i>
									Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown
									title={user ? user!.name : userInfo!.name}
									id="user-account"
								>
									<LinkContainer to="/profile">
										<NavDropdown.Item>
											Profile
										</NavDropdown.Item>
									</LinkContainer>
									{userInfo.isAdmin && (
										<>
											<NavDropdown.Divider />
											<LinkContainer to="/admin/userList">
												<NavDropdown.Item>
													Users
												</NavDropdown.Item>
											</LinkContainer>
											<LinkContainer to="/admin/productList">
												<NavDropdown.Item>
													Products
												</NavDropdown.Item>
											</LinkContainer>
											<LinkContainer to="/admin/orderList">
												<NavDropdown.Item>
													Orders
												</NavDropdown.Item>
											</LinkContainer>
										</>
									)}
									<NavDropdown.Divider />
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
