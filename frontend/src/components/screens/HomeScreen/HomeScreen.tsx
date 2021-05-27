import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { listProducts } from "../../../redux/actions/productActions";
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../../ProductCard/ProductCard";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import { useStartLoading } from "../../../hooks";
import { RouteComponentProps } from "react-router";

const HomeScreen = ({ match }: RouteComponentProps<RouteParams>) => {
	const keyword = match.params.keyword;
	const { loading, error, products } = useAppSelector(
		(state) => state.productList
	);
	const startLoading = useStartLoading(loading);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(listProducts(keyword));
	}, [dispatch, keyword]);

	return (
		<>
			<h3>
				<i>Latest</i>
			</h3>
			{loading || startLoading ? (
				<Loader></Loader>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					{products?.map((product) => (
						<Col key={product._id} sm={6} md={6} lg={4} xl={3}>
							<ProductCard {...product}></ProductCard>
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default HomeScreen;
