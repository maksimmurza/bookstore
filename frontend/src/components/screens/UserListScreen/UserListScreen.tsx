import React, { useState, useEffect, FormEvent } from "react";
import { Button, Table } from "react-bootstrap";
import { Check, X, PencilFill, Trash } from "react-bootstrap-icons";
import { RouteChildrenProps } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import { getUserList, deleteUser } from "../../../redux/actions/userActions";

const UserListScreen = () => {
	const dispatch = useAppDispatch();
	const { loading, error, users } = useAppSelector((state) => state.userList);

	useEffect(() => {
		dispatch(getUserList());
	}, [dispatch]);

	const deleteUserHandler = (id: string) => {
		dispatch(deleteUser(id));
	};

	return (
		<>
			<h3>Users</h3>
			{loading && <Loader></Loader>}
			{error && <Message variant="danger">{error}</Message>}
			{users && (
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>
									{user.isAdmin ? (
										<Check size="2em" color="green"></Check>
									) : (
										<X size="1.5em" color="gray"></X>
									)}
								</td>
								<td>
									<LinkContainer
										to={`/user/${user._id}/edit`}
									>
										<Button
											className="btn-sm"
											variant="outline-info"
										>
											<PencilFill></PencilFill>
										</Button>
									</LinkContainer>
									<Button
										className="btn-sm ml-2"
										variant="danger"
										onClick={() =>
											deleteUserHandler(user._id)
										}
									>
										<Trash></Trash>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListScreen;
