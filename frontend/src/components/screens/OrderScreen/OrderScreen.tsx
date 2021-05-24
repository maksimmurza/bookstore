import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, RouteChildrenProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import { getOrderDetails, payOrder } from "../../../redux/actions/orderActions";
import axios from "axios";
import {
	ORDER_PAY_RESET,
	ORDER_DETAILS_RESET,
} from "../../../redux/constants/orderConstants";

const OrderScreen = ({ match }: RouteChildrenProps<{ id: string }>) => {
	const [sdkReady, setSdkReady] = useState(false);
	const dispatch = useAppDispatch();
	const orderId: string = match!.params.id;
	const { loading, error, order } = useAppSelector(
		(state) => state.orderDetails
	);
	const {
		loading: loadingPay,
		success: successPay,
		error: errorPay,
	} = useAppSelector((state) => state.orderPay);

	const successPaymentHandler = (paymentResult: PaymentResult) => {
		dispatch(payOrder(orderId, paymentResult));
	};

	useEffect(() => {
		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get("/api/config/paypal");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			document.body.appendChild(script);
			script.onload = () => {
				setSdkReady(true);
			};
		};
		addPayPalScript();

		if (!order || successPay) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch(getOrderDetails(orderId));
		}

		return () => {
			dispatch({ type: ORDER_DETAILS_RESET });
		};
	}, [dispatch, orderId, successPay]);

	let itemsPrice;

	if (!loading) {
		itemsPrice = order!.orderItems.reduce(
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
					<h3>Order {order!._id}</h3>
					<Row>
						<Col md={8}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h4>Shipping</h4>
									<p>
										<strong>Name: </strong>
										{order!.user?.name}{" "}
									</p>
									<p>
										<strong>Email: </strong>
										<a
											href={`mailto:${
												order!.user?.email
											}`}
										>
											{order!.user?.email}
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
																	to={`/product/${item.product}`}
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
												<Col className="text-left">
													Items
												</Col>
												<Col>£{itemsPrice}</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<Row>
												<Col className="text-left">
													Shipping
												</Col>
												<Col>
													£{order!.shippingPrice}
												</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<Row>
												<Col className="text-left">
													<strong>Total</strong>
												</Col>
												<Col>£{order!.totalPrice}</Col>
											</Row>
										</ListGroup.Item>
										{!order!.isPaid && (
											<ListGroup.Item>
												{loadingPay && (
													<Loader></Loader>
												)}
												{!sdkReady ? (
													<Loader></Loader>
												) : (
													<PayPalButton
														amount={
															order!.totalPrice
														}
														onSuccess={
															successPaymentHandler
														}
													></PayPalButton>
												)}
											</ListGroup.Item>
										)}
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
