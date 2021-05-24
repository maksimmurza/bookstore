import React, { useState, useEffect, FormEvent } from "react";
import { Button, Table, ButtonGroup, Modal } from "react-bootstrap";
import { Check, X, PencilFill, Trash } from "react-bootstrap-icons";
import { RouteChildrenProps, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import { getOrders } from "../../../redux/actions/orderActions";
import { useStartLoading } from "../../../hooks";

const OrdersScreen = () => {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const [deletedOrderId, setDeletedOrderId] = useState("");

	const handleCloseDeleteDialog = () => setShowDeleteDialog(false);
	const handleShowDeleteDialog = () => setShowDeleteDialog(true);

	const dispatch = useAppDispatch();
	const history = useHistory();
	const { loading, error, orders } = useAppSelector(
		(state) => state.orderList
	);
	const startLoading = useStartLoading(loading);
	// const {
	// 	loading: deleteLoading,
	// 	error: deleteError,
	// 	success,
	// } = useAppSelector((state) => state.userDelete);
	const { userInfo } = useAppSelector((state) => state.userLogin);

	useEffect(() => {
		dispatch(getOrders());
	}, [dispatch /*success*/]);

	// const deleteUserHandler = (id: string) => {
	// 	setDeletedUserId(id);
	// 	handleShowDeleteDialog();
	// };

	// useEffect(() => {
	// 	if (deleteConfirmation) {
	// 		dispatch(deleteUser(deletedUserId));
	// 		setDeleteConfirmation(false);
	// 	}
	// }, [deleteConfirmation, dispatch, deletedUserId]);

	// stop displaying user list if admin logged out
	useEffect(() => {
		if (!userInfo?.isAdmin) {
			history.push("/login");
		}
	}, [history, userInfo]);

	return (
		<>
			<h3>Orders</h3>
			{loading || startLoading ? (
				<Loader></Loader>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				orders && (
					<>
						<Table striped bordered hover responsive>
							<thead>
								<tr>
									<th>ID</th>
									<th>USER</th>
									<th>TOTAL PRICE</th>
									<th>DATE</th>
									<th>PAID</th>
									<th>IS DELIVERED</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr key={order._id}>
										<td>{order._id}</td>
										<td>{order.user?.name}</td>
										<td>{order.totalPrice}</td>
										<td>
											{order.createdAt.substring(0, 10)}
										</td>
										<td>
											{order.isPaid ? (
												order.paidAt.substring(0, 10)
											) : (
												<X
													size="1.5em"
													color="gray"
												></X>
											)}
										</td>
										<td>
											{order.isDelivered ? (
												order.deliveredAt.substring(
													0,
													10
												)
											) : (
												<X
													size="1.5em"
													color="gray"
												></X>
											)}
										</td>
										<td>
											<ButtonGroup>
												<LinkContainer
													to={`/orders/${order._id}`}
												>
													<Button
														className="btn-sm"
														variant="outline-info"
													>
														Details
													</Button>
												</LinkContainer>
												<Button
													className="btn-sm"
													variant="outline-danger"
													onClick={
														() => 0
														// deleteUserHandler(
														// 	order._id
														// )
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
									Are you sure you want to delete the user?
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

export default OrdersScreen;
