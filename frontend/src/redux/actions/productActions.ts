import axios from "axios";
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_EDIT_REQUEST,
	PRODUCT_EDIT_SUCCESS,
	PRODUCT_EDIT_FAIL,
	PRODUCT_EDIT_RESET,
} from "../constants/productConstants";
import { AppThunk } from "../store";

export const listProducts = (): AppThunk => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await axios.get("/api/products");
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const detailsProduct =
	(id: string): AppThunk =>
	async (dispatch) => {
		try {
			dispatch({ type: PRODUCT_DETAILS_REQUEST });
			const { data } = await axios.get(`/api/products/${id}`);
			dispatch({
				type: PRODUCT_DETAILS_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: PRODUCT_DETAILS_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const deleteProduct =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: PRODUCT_DELETE_REQUEST });
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo!.token}`,
				},
			};
			const { data } = await axios.delete(`/api/products/${id}`, config);
			dispatch({
				type: PRODUCT_DELETE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: PRODUCT_DELETE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
