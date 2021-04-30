import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { detailsProduct } from "../../../redux/actions/productActions";
import { Link, useHistory, useParams } from "react-router-dom";
import Rating from "../../Rating/Rating";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import { ArrowLeft } from "react-bootstrap-icons";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	ListGroupItem,
	FormControl,
} from "react-bootstrap";
import { PRODUCT_DETAILS_CLEAN } from "../../../redux/constants";
import { addItem } from "../../../redux/actions/cartActions";
import "./ProductScreen.scss";

const ProductScreen = () => {
	const { id }: params = useParams();
	const history = useHistory();
	const dispatch = useAppDispatch();
	const { product, loading, error } = useAppSelector(
		(state) => state.productDetails
	);

	const [qty, setQty] = useState(1);

	useEffect(() => {
		dispatch(detailsProduct(id));
	}, [id, dispatch]);

	const addToCartHandler = () => {
		// history.push(`/cart/${id}?qty=${qty}`);
		dispatch(addItem(id, qty));
	};

	return (
		<>
			<Link
				to="/"
				className="btn btn-transparent mb-3 button-back"
				onClick={() => {
					dispatch({ type: PRODUCT_DETAILS_CLEAN });
				}}
			>
				<ArrowLeft color="gray" size="30"></ArrowLeft>
			</Link>
			{loading ? (
				<Loader></Loader>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col
						md={4}
						style={{
							display: "grid",
							placeItems: "center",
							overflow: "hidden",
						}}
					>
						<Image
							className="product-image"
							src={product?.image}
							alt={product?.name}
							fluid
						></Image>
					</Col>
					<Col md={5}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product?.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									rating={Number(product?.rating)}
									text={`${product?.numReviews} reviews`}
									color="brown"
								></Rating>
							</ListGroup.Item>
							<ListGroup.Item>
								<span className="mr-3">{product?.info}</span>
								<span className="brand-name">
									<strong>{product?.brand}</strong>
								</span>
							</ListGroup.Item>
							<ListGroup.Item>
								<p>{product?.description}</p>
							</ListGroup.Item>
						</ListGroup>
					</Col>

					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroupItem>
									<Row>
										<Col className="text-left">Price: </Col>
										<Col className="text-left">
											<strong>£ {product?.price}</strong>
										</Col>
									</Row>
								</ListGroupItem>
								<ListGroupItem>
									<Row>
										<Col className="text-left">
											Status:{" "}
										</Col>
										<Col className="text-left">
											{product!.inStock > 0
												? "In Stock"
												: "Out of stock"}
										</Col>
									</Row>
								</ListGroupItem>
								{product!.inStock > 0 && (
									<ListGroupItem>
										<Row>
											<Col className="text-left">
												Quantity:
											</Col>
											<Col>
												<FormControl
													as="input"
													type="numbers"
													value={qty}
													placeholder="0"
													onChange={(e) => {
														e.target.value === ""
															? setQty(0)
															: setQty(
																	parseInt(
																		e.target
																			.value
																	)
															  );
													}}
												></FormControl>
											</Col>
										</Row>
									</ListGroupItem>
								)}
								<ListGroupItem>
									<Button
										className="btn-block"
										onClick={addToCartHandler}
										disabled={
											product?.inStock === 0 ||
											qty === 0 ||
											product!.inStock < qty
										}
										title={
											product?.inStock === 0
												? "No product in stock"
												: qty === 0
												? "You didn't set a quantity"
												: product!.inStock < qty
												? "Quantity of this product is lower than you want to buy"
												: "Go to the order details"
										}
									>
										Add to Cart
									</Button>
								</ListGroupItem>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

type params = {
	id: string;
};

export default ProductScreen;
