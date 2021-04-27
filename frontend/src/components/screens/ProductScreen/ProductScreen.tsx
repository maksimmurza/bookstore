import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../../Rating/Rating";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	ListGroupItem,
} from "react-bootstrap";
import "./ProductScreen.scss";
import axios from "axios";

const ProductScreen = () => {
	const { id }: params = useParams();
	const [product, setProduct] = useState<Product>({
		_id: 0,
		name: "",
		image: "",
		info: "",
		category: "",
		brand: "",
		currency: "",
		price: 0,
		inStock: 0,
		rating: 0,
		numReviews: 0,
		description: "",
	});

	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${id}`);
			setProduct(data);
		};
		fetchProduct();
	}, [id]);

	return (
		<>
			<Link to="/" className="btn btn-dark mb-3">
				Go Back
			</Link>
			<Row>
				<Col md={4}>
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
									<Col className="text-left">Status: </Col>
									<Col className="text-left">
										{product!.inStock > 0
											? "In Stock"
											: "Out of stock"}
									</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Button
									className="btn-block"
									disabled={product?.inStock === 0}
								>
									Add to Cart
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

type params = {
	id?: string;
};

export default ProductScreen;
