import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { listProducts } from "../../../redux/actions/productActions";
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../../Product/ProductCard";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";

const HomeScreen = () => {
	const dispatch = useAppDispatch();
	const { loading, error, products } = useAppSelector(
		(state) => state.productList
	);

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<>
			<h3>
				<i>Latest</i>
			</h3>
			{loading ? (
				<Loader></Loader>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					{products?.map((product) => (
						<Col sm={6} md={6} lg={4} xl={3}>
							<ProductCard
								key={product._id}
								{...product}
							></ProductCard>
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default HomeScreen;
