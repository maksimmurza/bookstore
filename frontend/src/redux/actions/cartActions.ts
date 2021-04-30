import axios from "axios";
import { CART_ADD_ITEM } from "../constants";
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
