import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import CartScreen from "./screens/CartScreen/CartScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen/PlaceOrderScreen";

function App() {
	return (
		<Router>
			<Header></Header>
			<main className="py-3">
				<Container>
					<Route path="/" component={HomeScreen} exact></Route>
					<Route
						path="/product/:id"
						component={ProductScreen}
						exact
					></Route>
					<Route
						path="/cart/:id?"
						component={CartScreen}
						exact
					></Route>
					<Route path="/login" component={LoginScreen} exact></Route>
					<Route
						path="/profile"
						component={ProfileScreen}
						exact
					></Route>
					<Route
						path="/register"
						component={RegisterScreen}
						exact
					></Route>
					<Route
						path="/shipping"
						component={ShippingScreen}
						exact
					></Route>
					<Route
						path="/payment"
						component={PaymentScreen}
						exact
					></Route>
					<Route
						path="/placeorder"
						component={PlaceOrderScreen}
						exact
					></Route>
				</Container>
			</main>
			<Footer></Footer>
		</Router>
	);
}

export default App;
