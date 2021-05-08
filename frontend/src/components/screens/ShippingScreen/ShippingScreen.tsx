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
import { saveShippingAddress } from "../../../redux/actions/cartActions";
import FormContainer from "../../FormContainer/FormContainer";
import CheckoutSteps from "../../CheckoutSteps/CheckoutSteps";

const ShippingScreen = ({ history, location }: RouteChildrenProps) => {
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [address, setAddress] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [message, setMessage] = useState("");

	const redirect = location.search
		? location.search.split("=")[1]
		: "/profile";

	const dispatch = useAppDispatch();
	// const { loading, error } = useAppSelector((state) => state.userRegister);
	// const { userInfo } = useAppSelector((state) => state.userLogin);
	const { shippingAddress } = useAppSelector((state) => state.cart);

	useEffect(() => {
		if (shippingAddress) {
			setCountry(shippingAddress.country);
			setCity(shippingAddress.city);
			setAddress(shippingAddress.address);
			setPostalCode(shippingAddress.postalCode);
		}
	}, [shippingAddress]);

	const submitHandler = (event: FormEvent) => {
		event.preventDefault();
		dispatch(saveShippingAddress({ country, city, address, postalCode }));
		history.push("/payment");
	};

	return (
		<>
			<CheckoutSteps step1 step2></CheckoutSteps>
			<FormContainer>
				<h3>Shipping</h3>
				<Form onSubmit={submitHandler} className="pt-4">
					<FormGroup controlId="country">
						<FormLabel>Country</FormLabel>
						<FormControl
							type="text"
							placeholder="You country"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						></FormControl>
					</FormGroup>

					<FormGroup controlId="city">
						<FormLabel>City address</FormLabel>
						<FormControl
							type="text"
							placeholder="Enter city"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						></FormControl>
					</FormGroup>

					<FormGroup controlId="address">
						<FormLabel>Address</FormLabel>
						<FormControl
							type="text"
							placeholder="Address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						></FormControl>
					</FormGroup>

					<FormGroup controlId="postalCode">
						<FormLabel>Postal code</FormLabel>
						<FormControl
							type="text"
							placeholder="Postal code"
							value={postalCode}
							onChange={(e) => setPostalCode(e.target.value)}
						></FormControl>
					</FormGroup>
					<Button type="submit" variant="primary">
						Continue
					</Button>
				</Form>
			</FormContainer>
		</>
	);
};

export default ShippingScreen;