import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { listProducts } from "../../../redux/actions/productActions";
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../../Product/ProductCard";

const HomeScreen = () => {
	const dispatch = useAppDispatch();
	const { loading, error, products } = useAppSelector(
		(state) => state.productList
	);

	console.log(useAppSelector((state) => state));

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<>
			<h1>
				<i>Latest</i>
			</h1>
			{loading ? (
				<h3>Loading...</h3>
			) : error ? (
				<h3>{error}</h3>
			) : (
				<Row>
					{products?.map((product) => (
						<Col sm={12} md={6} lg={4} xl={3}>
							<ProductCard {...product}></ProductCard>
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default HomeScreen;
