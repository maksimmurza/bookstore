import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
} from "../constants";
import { AnyAction } from "redux";

export const orderReducer = (
	state: Partial<AppState> = {},
	action: AnyAction
) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return { loading: true };
		case ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				order: action.payload as Order,
			};
		case ORDER_CREATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const orderDetailsReducer = (
	state: Partial<AppState> = { loading: true, order: {} as Order },
	action: AnyAction
) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case ORDER_DETAILS_SUCCESS:
			return {
				loading: false,
				order: action.payload as Order,
			};
		case ORDER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
