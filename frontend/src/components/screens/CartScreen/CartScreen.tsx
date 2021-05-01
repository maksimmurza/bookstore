import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
	ListGroupItem,
	FormControl,
} from "react-bootstrap";
import { addItem } from "../../../redux/actions/cartActions";
import Message from "../../Message/Message";
import { RootState } from "../../../redux/store";
import { Trash } from "react-bootstrap-icons";

const CartScreen = ({
	match,
	location,
	history,
}: RouteComponentProps<RouteParams>) => {
	const productId = match.params.id;
	const qty = location.search ? parseInt(location.search.split("=")[1]) : 1;
	const dispatch = useDispatch();

	const cart = useSelector((state: RootState) => state.cart);
	const cartItems = cart.cartItems;

	useEffect(() => {
		if (productId) {
			dispatch(addItem(productId, qty));
		}
	}, [productId, qty, dispatch]);

	const deleteItemHandler = () => {};

	return (
		<Row>
			<Col md={8}>
				<h3 className="mb-3">Shopping Cart</h3>
				{cartItems.length === 0 ? (
					<Message>
						You shopping cart is empty <Link to="/">Go back</Link>
					</Message>
				) : (
					cartItems.map((item) => {
						const product: Product = item[0];
						const qty: number = item[1];
						return (
							<ListGroupItem key={product._id}>
								<Row>
									<Col md={2}>
										<Image
											src={product.image}
											alt={product.name}
											fluid
											rounded
										></Image>
									</Col>
									<Col md={5}>
										<Link to={`/product/${product._id}`}>
											{product.name}
										</Link>
									</Col>
									<Col md={2}>£ {product.price}</Col>
									<Col md={2}>
										<FormControl
											as="select"
											value={qty}
											onChange={(e) => {
												dispatch(
													addItem(
														product._id.toString(),
														Number(e.target.value)
													)
												);
											}}
										>
											{[
												...Array(
													product.inStock
												).keys(),
											].map((key) => (
												<option
													key={key + 1}
													value={key + 1}
												>
													{key + 1}
												</option>
											))}
										</FormControl>
									</Col>
									<Col md={1}>
										<Button
											variant="danger"
											onClick={deleteItemHandler}
										>
											<Trash></Trash>
										</Button>
									</Col>
								</Row>
							</ListGroupItem>
						);
					})
				)}
			</Col>
			<Col md={2}></Col>
			<Col md={2}></Col>
		</Row>
	);
};

interface RouteParams {
	id: string;
}

export default CartScreen;
