import React, { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	detailsProduct,
	createProductReview,
} from "../../../redux/actions/productActions";
import { useHistory, useParams } from "react-router-dom";
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
	Form,
	Spinner,
} from "react-bootstrap";
import { addItem } from "../../../redux/actions/cartActions";
import "./ProductScreen.scss";
import { useStartLoading } from "../../../hooks";
import { PRODUCT_REVIEW_CREATE_RESET } from "../../../redux/constants/productConstants";

const ProductScreen = () => {
	const { product, loading, error } = useAppSelector(
		(state) => state.productDetails
	);
	console.log(product);
	const startLoading = useStartLoading(loading);
	const [imageLoading, setImageLoading] = useState(true);
	const [inCart, setInCart] = useState(false);
	const { id }: params = useParams();
	const history = useHistory();
	const dispatch = useAppDispatch();
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState("");
	const [comment, setComment] = useState("");

	const {
		loading: createReviewLoading,
		error: createReviewError,
		success: createReviewSuccess,
	} = useAppSelector((state) => state.productReviewCreate);

	const { userInfo } = useAppSelector((state) => state.userLogin);

	useEffect(() => {
		if (createReviewSuccess) {
			setComment("");
			setRating("");
			dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
		}
		dispatch(detailsProduct(id));
	}, [id, dispatch, createReviewSuccess]);

	const addToCartHandler = () => {
		dispatch(addItem(id, qty));
		setInCart(true);
	};

	const createReviewHandler = (e: FormEvent) => {
		e.preventDefault();
		dispatch(createProductReview(id, Number(rating), comment));
	};

	const image = (
		<Image
			src={product?.image}
			alt={product?.name}
			className="product-image"
			onLoad={() => {
				setImageLoading(false);
			}}
			fluid
			style={{ display: `${imageLoading ? "none" : "block"}` }}
		></Image>
	);

	return (
		<>
			<Button
				className="btn transparent mb-3"
				variant="link"
				onClick={() => {
					history.goBack();
				}}
			>
				<ArrowLeft color="gray" size="30"></ArrowLeft>
			</Button>
			{loading || startLoading || !product ? (
				<Loader></Loader>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						<Col
							md={4}
							style={{
								display: "grid",
								placeItems: "center",
								overflow: "hidden",
							}}
						>
							{image}
							{imageLoading && (
								<Spinner
									as="span"
									animation="grow"
									variant="light"
								/>
							)}
						</Col>
						<Col md={5}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h3>{product?.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										rating={Number(product?.rating)}
										text={`${product.numReviews} review${
											product.numReviews > 1 ? "s" : ""
										}`}
										color="brown"
									></Rating>
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
											<Col className="text-left">
												Price:{" "}
											</Col>
											<Col className="text-left">
												<strong>
													£ {product?.price}
												</strong>
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
														type="number"
														value={qty}
														placeholder="0"
														onChange={(e) => {
															setInCart(false);
															e.target.value ===
															""
																? setQty(0)
																: setQty(
																		parseInt(
																			e
																				.target
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
											variant={`${
												inCart ? "success" : "primary"
											}`}
											onClick={addToCartHandler}
											disabled={
												product?.inStock === 0 ||
												qty === 0 ||
												product!.inStock < qty ||
												inCart
											}
											title={
												product?.inStock === 0
													? "No product in stock"
													: qty === 0
													? "You didn't set a quantity"
													: product!.inStock < qty
													? "Quantity of this product is lower than you want to buy"
													: inCart
													? "Item(s) already in cart. Change quantity or go to the cart"
													: `Add ${qty} items to the cart`
											}
										>
											{`${
												inCart
													? "In cart"
													: "Add to cart"
											}`}
										</Button>
									</ListGroupItem>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row className="mt-3">
						<Col md={6}>
							<h3>Reviews</h3>
							{product.reviews.length === 0 && (
								<Message variant="light">
									No reviews yet
								</Message>
							)}
							<ListGroup variant="flush">
								{product.reviews.map((r) => (
									<ListGroupItem>
										<h5>{r.name}</h5>
										<Rating
											rating={r.rating}
											color={"gold"}
										></Rating>
										<p>{r.createdAt.substring(0, 10)}</p>
										<p>{r.comment}</p>
									</ListGroupItem>
								))}
								<ListGroupItem>
									<h3>Write review</h3>
									{createReviewError && (
										<Message variant="danger">
											{createReviewError}
										</Message>
									)}
									{!userInfo ? (
										<Message variant="info">
											If you want to write review you must
											log in
										</Message>
									) : (
										<Form onSubmit={createReviewHandler}>
											<Form.Group controlId="rating">
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as="select"
													value={rating}
													onChange={(e) =>
														setRating(
															e.target.value
														)
													}
												>
													<option value="0">
														Select...
													</option>
													<option value="1">
														1 star
													</option>
													<option value="2">
														2 stars
													</option>
													<option value="3">
														3 stars
													</option>
													<option value="4">
														4 stars
													</option>
													<option value="5">
														5 stars
													</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId="comment">
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as="textarea"
													value={comment}
													onChange={(e) =>
														setComment(
															e.target.value
														)
													}
												></Form.Control>
												<Button
													disabled={
														createReviewLoading
													}
													type="submit"
													className="mt-3"
												>
													{createReviewLoading
														? "Loading..."
														: "Submit"}
												</Button>
											</Form.Group>
										</Form>
									)}
								</ListGroupItem>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

type params = {
	id: string;
};

export default ProductScreen;
