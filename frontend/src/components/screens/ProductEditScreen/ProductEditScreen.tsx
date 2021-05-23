import React, { useState, useEffect, FormEvent } from "react";
import {
	Row,
	Col,
	Form,
	Button,
	FormGroup,
	FormLabel,
	FormControl,
} from "react-bootstrap";
import { Link, RouteChildrenProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import {
	detailsProduct,
	editProduct,
} from "../../../redux/actions/productActions";
import FormContainer from "../../FormContainer/FormContainer";
import {
	PRODUCT_EDIT_RESET,
	PRODUCT_DETAILS_RESET,
} from "../../../redux/constants/productConstants";

const ProductEditScreen = ({
	location,
	history,
	match,
}: RouteChildrenProps<RouteParams>) => {
	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [category, setCategory] = useState("");
	const [brand, setBrand] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [inStock, setInStock] = useState(0);
	const dispatch = useAppDispatch();

	const { userInfo } = useAppSelector((state) => state.userLogin);

	const {
		loading: editLoading,
		success: editSuccess,
		product: updatedProduct,
		error: editError,
	} = useAppSelector((state) => state.productEdit);

	const {
		product,
		loading: detailsLoading,
		error: detailsError,
	} = useAppSelector((state) => state.productDetails);

	useEffect(() => {
		dispatch(detailsProduct(match!.params.id));
	}, []);

	useEffect(() => {
		if (product && product._id === match?.params.id) {
			setName(product.name);
			setImage(product.image);
			setCategory(product.category);
			setBrand(product.brand);
			setPrice(product.price);
			setDescription(product.description);
			setInStock(product.inStock);
		}
	}, [product]);

	useEffect(() => {
		if (editSuccess) {
			dispatch({ type: PRODUCT_EDIT_RESET });
			history.push("/admin/productList");
		}
	}, [editSuccess, history]);

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();
		if (product) {
			dispatch(
				editProduct({
					...product,
					name,
					image,
					category,
					brand,
					price,
					description,
					inStock,
				})
			);
			dispatch({ type: PRODUCT_DETAILS_RESET });
		}
	};

	return (
		<FormContainer>
			<h3>Edit Product</h3>
			{/* {message && <Message variant="danger">{message}</Message>} */}
			{editError && <Message variant="danger">{editError}</Message>}
			{detailsError && <Message variant="danger">{detailsError}</Message>}
			{editLoading || (detailsLoading && <Loader></Loader>)}
			<Form onSubmit={submitHandler} className="pt-4">
				<FormGroup controlId="name">
					<FormLabel>Name</FormLabel>
					<FormControl
						type="text"
						required
						placeholder="Product name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="price">
					<FormLabel>Price</FormLabel>
					<FormControl
						type="number"
						required
						placeholder="Enter price"
						value={price}
						onChange={(e) => setPrice(parseInt(e.target.value))}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="image">
					<FormLabel>Image</FormLabel>
					<FormControl
						type="text"
						required
						placeholder="Enter image URL"
						value={image}
						onChange={(e) => setImage(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="category">
					<FormLabel>Category</FormLabel>
					<FormControl
						type="text"
						required
						placeholder="Enter category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="brand">
					<FormLabel>Brand</FormLabel>
					<FormControl
						type="text"
						required
						placeholder="Enter brand"
						value={brand}
						onChange={(e) => setBrand(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="inStock">
					<FormLabel>In stock</FormLabel>
					<FormControl
						type="number"
						required
						placeholder="Quantity"
						value={inStock}
						onChange={(e) => setInStock(parseInt(e.target.value))}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="description">
					<FormLabel>Description</FormLabel>
					<FormControl
						type="text"
						required
						placeholder="Product description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></FormControl>
				</FormGroup>

				<Button className="float-right" type="submit" variant="primary">
					Save
				</Button>
				<Button
					className="mr-2 float-right"
					variant="secondary"
					onClick={() => {
						history.push("/admin/productList");
					}}
				>
					Cancel
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ProductEditScreen;
