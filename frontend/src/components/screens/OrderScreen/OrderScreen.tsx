import React, { useState, useEffect, FormEvent } from "react";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Card,
	Button,
	ListGroupItem,
} from "react-bootstrap";
import { Link, RouteChildrenProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import { saveShippingAddress } from "../../../redux/actions/cartActions";
import FormContainer from "../../FormContainer/FormContainer";
import { getOrderDetails } from "../../../redux/actions/orderActions";

const OrderScreen = ({ match }: RouteChildrenProps<{ id: string }>) => {
	const dispatch = useAppDispatch();
	const orderId: string = match!.params.id;
	const { loading, error, order } = useAppSelector(
		(state) => state.orderDetails
	);

	useEffect(() => {
		dispatch(getOrderDetails(orderId));
	}, [dispatch, orderId]);

	let itemsPrice;

	if (!loading) {
		itemsPrice = order?.orderItems.reduce(
			(acc, item) => acc + item.quantity * item.price,
			0
		);
	}

	return (
		<>
			{loading ? (
				<Loader></Loader>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<h3>Order {orderId}</h3>
					<Row>
						<Col md={8}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h4>Shipping</h4>
									<p>
										<strong>Name: </strong>
										{order!.user.name}{" "}
									</p>
									<p>
										<strong>Email: </strong>
										<a href={`mailto:${order!.user.email}`}>
											{order!.user.email}
										</a>
									</p>
									<p>
										<strong>Address: </strong>
										{`${order!.shippingAddress?.country}, ${
											order!.shippingAddress?.city
										}, 
                            ${order!.shippingAddress?.address}, ${
											order!.shippingAddress?.postalCode
										}`}
									</p>
									<Message
										variant={
											order!.isDelivered
												? "success"
												: "secondary"
										}
									>
										{order!.isDelivered
											? `Delivered on ${order!.paidAt}`
											: `Order not delivered`}
									</Message>
								</ListGroup.Item>
								<ListGroup.Item>
									<h4>Payment Method</h4>
									<p>
										<strong>Method: </strong>
										{order!.paymentMethod}
									</p>
									<Message
										variant={
											order!.isPaid
												? "success"
												: "secondary"
										}
									>
										{order!.isPaid
											? `Paid on ${order!.paidAt}`
											: `Order not paid`}
									</Message>
								</ListGroup.Item>
								<ListGroup.Item>
									<h4>Order items</h4>
									{order!.orderItems?.length === 0 ? (
										<Message>Order is empty</Message>
									) : (
										<ListGroup variant="flush">
											{order!.orderItems!.map(
												(item, i) => (
													<ListGroup.Item key={i}>
														<Row>
															<Col md={2}>
																<Image
																	src={
																		item.image
																	}
																	alt={
																		item.name
																	}
																	fluid
																	rounded
																></Image>
															</Col>
															<Col md={6}>
																<Link
																	to={`/product/${item._id}`}
																>
																	{item.name}
																</Link>
															</Col>
															<Col>
																£ {item.price} x{" "}
																{item.quantity}{" "}
																= £
																{item.price *
																	item.quantity}
															</Col>
														</Row>
													</ListGroup.Item>
												)
											)}
										</ListGroup>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={4}>
							<Card>
								<ListGroup variant="flush">
									<ListGroup>
										<ListGroup.Item>
											<h4>Order Summary</h4>
										</ListGroup.Item>
										<ListGroup.Item>
											<Row>
												<Col>Items</Col>
												<Col>£{itemsPrice}</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<Row>
												<Col>Shipping</Col>
												<Col>
													£{order!.shippingPrice}
												</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<Row>
												<Col>
													<strong>Total</strong>
												</Col>
												<Col>£{order!.totalPrice}</Col>
											</Row>
										</ListGroup.Item>
										{error && (
											<ListGroup.Item>
												<Message variant="danger">
													{error}
												</Message>
											</ListGroup.Item>
										)}
									</ListGroup>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default OrderScreen;
