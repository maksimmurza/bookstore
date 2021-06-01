import React, { useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProductCard.scss";
import Rating from "../Rating/Rating";

const ProductCard = (props: Product) => {
	const [imageLoading, setImageLoading] = useState(true);
	const image = (
		<Card.Img
			src={props.image}
			variant="top"
			onLoad={() => {
				setImageLoading(false);
			}}
			style={{
				display: `${imageLoading ? "none" : "block"}`,
				height: "calc(150px + 5vh)",
				width: "auto",
			}}
		></Card.Img>
	);
	return (
		<>
			<Card className="my-3 p-3 rounded">
				<Link
					to={`/product/${props._id}`}
					style={{
						display: "grid",
						placeItems: "center",
						overflow: "hidden",
					}}
				>
					{image}
					{imageLoading && (
						<Spinner as="span" animation="grow" variant="light" />
					)}
				</Link>

				<Card.Body>
					<Link to={`/product/${props._id}`}>
						<Card.Title as="div" className="card-title">
							<strong>{props.name}</strong>
						</Card.Title>
					</Link>

					<Card.Text as="div">
						<Rating
							rating={props.rating}
							text={`${props.numReviews} review${
								props.numReviews > 1 ? "s" : ""
							}`}
							color="gold"
						></Rating>
					</Card.Text>

					<Card.Text as="h4">
						<strong>£{props.price}</strong>
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
};

export default ProductCard;
