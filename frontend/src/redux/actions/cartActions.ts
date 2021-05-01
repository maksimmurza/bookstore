import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants";
import { AppThunk } from "../store";

export const addItem = (id: string, qty: number): AppThunk => async (
	dispatch,
	getState
) => {
	const { data } = await axios.get(`/api/products/${id}`);
	dispatch({ type: CART_ADD_ITEM, payload: [data, qty] });
	localStorage.setItem(
		"cartItems",
		JSON.stringify(getState().cart.cartItems)
	);
};

export const removeItem = (id: string): AppThunk => async (
	dispatch,
	getState
) => {
	dispatch({ type: CART_REMOVE_ITEM, payload: id });
	localStorage.setItem(
		"cartItems",
		JSON.stringify(getState().cart.cartItems)
	);
};
