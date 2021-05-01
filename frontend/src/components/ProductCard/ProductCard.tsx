import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProductCard.scss";
import Rating from "../Rating/Rating";

const ProductCard = (props: Product) => {
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
					<Card.Img
						src={props.image}
						variant="top"
						style={{
							height: "calc(150px + 5vh)",
							width: "auto",
						}}
					></Card.Img>
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
							text={`${props.numReviews} reviews`}
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
