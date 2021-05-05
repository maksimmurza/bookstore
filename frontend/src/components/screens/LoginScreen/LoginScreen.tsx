import React, {
	useState,
	useEffect,
	FC,
	FormEventHandler,
	FormEvent,
} from "react";
import {
	Row,
	Col,
	Form,
	Button,
	FormGroup,
	FormLabel,
	FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../Loader/Loader";
import Message from "../../Message/Message";
import { login } from "../../../redux/actions/userActions";
import FormContainer from "../../FormContainer/FormContainer";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useAppDispatch();
	const { loading, error, userInfo } = useAppSelector(
		(state) => state.userLogin
	);

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<FormContainer>
			<h3>Sign In</h3>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader></Loader>}
			<Form onSubmit={submitHandler}>
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

				<Button type="submit" variant="primary">
					Log In
				</Button>
			</Form>
		</FormContainer>
	);
};

export default LoginScreen;
