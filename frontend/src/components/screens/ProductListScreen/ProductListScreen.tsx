import React, { useState, useEffect, FormEvent } from "react";
import { Button, Table, ButtonGroup, Modal, Row, Col } from "react-bootstrap";
import { PencilFill, Trash, Plus } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import {
	listProducts,
	deleteProduct,
} from "../../../redux/actions/productActions";
import { useStartLoading } from "../../../hooks";

const ProductListScreen = () => {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const [deletedProductId, setDeletedProductId] = useState("");

	const handleCloseDeleteDialog = () => setShowDeleteDialog(false);
	const handleShowDeleteDialog = () => setShowDeleteDialog(true);

	const dispatch = useAppDispatch();
	const history = useHistory();
	const { loading, error, products } = useAppSelector(
		(state) => state.productList
	);
	const startLoading = useStartLoading(loading);
	const {
		loading: deleteLoading,
		error: deleteError,
		success,
	} = useAppSelector((state) => state.productDelete);
	const { userInfo } = useAppSelector((state) => state.userLogin);

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch, success]);

	const deleteProductHandler = (id: string) => {
		setDeletedProductId(id);
		handleShowDeleteDialog();
	};

	const createProductHandler = () => {};

	useEffect(() => {
		if (deleteConfirmation) {
			dispatch(deleteProduct(deletedProductId));
			setDeleteConfirmation(false);
		}
	}, [deleteConfirmation, dispatch, deletedProductId]);

	// stop displaying user list if admin logged out
	useEffect(() => {
		if (!userInfo?.isAdmin) {
			history.push("/login");
		}
	}, [history, userInfo]);

	return (
		<>
			<Row>
				<Col className="text-left">
					<h3>Products</h3>
				</Col>
				<Col className="float-end text-right">
					<Button onClick={createProductHandler}>
						<Plus></Plus>
						Add Product
					</Button>
				</Col>
			</Row>
			{loading || startLoading || deleteLoading ? (
				<Loader></Loader>
			) : error || deleteError ? (
				<Message variant="danger">
					{error ? error : deleteError}
				</Message>
			) : (
				products && (
					<>
						<Table striped bordered hover responsive>
							<thead>
								<tr>
									<th>ID</th>
									<th>NAME</th>
									<th>PRICE</th>
									<th>IN STOCK</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.name}</td>
										<td>{product.price}</td>
										<td>{product.inStock}</td>
										<td>
											<ButtonGroup>
												<LinkContainer
													to={`/admin/product/${product._id}/edit`}
												>
													<Button
														className="btn-sm"
														variant="outline-info"
													>
														<PencilFill></PencilFill>
													</Button>
												</LinkContainer>
												<Button
													className="btn-sm"
													variant="outline-danger"
													onClick={() =>
														deleteProductHandler(
															product._id
														)
													}
												>
													<Trash></Trash>
												</Button>
											</ButtonGroup>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						<Modal
							show={showDeleteDialog}
							onHide={handleCloseDeleteDialog}
							backdrop="static"
							keyboard={false}
						>
							<Modal.Header closeButton>
								<Modal.Title>
									Are you sure you want to delete this
									product?
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								You will not be able to cancel this action!
							</Modal.Body>
							<Modal.Footer>
								<Button
									variant="secondary"
									onClick={() => {
										setDeleteConfirmation(false);
										handleCloseDeleteDialog();
									}}
								>
									Close
								</Button>
								<Button
									variant="danger"
									onClick={() => {
										setDeleteConfirmation(true);
										handleCloseDeleteDialog();
									}}
								>
									Delete
								</Button>
							</Modal.Footer>
						</Modal>
					</>
				)
			)}
		</>
	);
};

export default ProductListScreen;
