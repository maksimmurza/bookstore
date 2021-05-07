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
import { RouteChildrenProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import { userDetails, userEdit } from "../../../redux/actions/userActions";

const ProfileScreen = ({ location, history }: RouteChildrenProps) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [successUpdate, setSuccessUpdate] = useState(false);

	const dispatch = useAppDispatch();
	const { loading, error, user } = useAppSelector(
		(state) => state.userDetails
	);
	const { userInfo } = useAppSelector((state) => state.userLogin);
	const { success } = useAppSelector((state) => state.userEdit);

	useEffect(() => {
		setSuccessUpdate(false);
		if (!userInfo) {
			history.push("/login");
		} else {
			if (!user!.name) {
				dispatch(userDetails("profile"));
			} else {
				setName(user!.name);
				setEmail(user!.email);
			}
		}
	}, [dispatch, history, success, user, userInfo]);

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();
		if (password === confirmPassword) {
			dispatch(userEdit({ ...user, name, email, password } as UserInfo));
			if (success) {
				setSuccessUpdate(success);
			}
		} else {
			setMessage("Passwords are not equal!");
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h3>Edit profile</h3>
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{successUpdate && (
					<Message variant="success">Information updated</Message>
				)}
				{loading && <Loader></Loader>}
				<Form onSubmit={submitHandler} className="pt-4">
					<FormGroup controlId="name">
						<FormLabel>Full name</FormLabel>
						<FormControl
							type="text"
							placeholder="You name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></FormControl>
					</FormGroup>

					<FormGroup controlId="email">
						<FormLabel>Email address</FormLabel>
						<FormControl
							type="email"
							placeholder="Enter Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></FormControl>
					</FormGroup>

					<FormGroup controlId="password">
						<FormLabel>Password</FormLabel>
						<FormControl
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></FormControl>
					</FormGroup>

					<FormGroup controlId="confirmPassword">
						<FormLabel>Confirm password</FormLabel>
						<FormControl
							type="password"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></FormControl>
					</FormGroup>
					<Button type="submit" variant="primary">
						Save changes
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h3>Orders</h3>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
