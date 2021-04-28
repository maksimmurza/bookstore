import { AnyAction } from "redux";
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_CLEAN,
} from "../constants";

export const productListReducer = (
	state: Partial<AppState> = { products: [] },
	action: AnyAction
) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] };
		case PRODUCT_LIST_SUCCESS:
			return {
				loading: false,
				products: action.payload as Array<Product>,
			};
		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productReducer = (
	state: Partial<AppState> = { product: {} as Product },
	action: AnyAction
) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { loading: true, product: {} as Product };
		case PRODUCT_DETAILS_SUCCESS:
			return { loading: false, product: action.payload as Product };
		case PRODUCT_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case PRODUCT_DETAILS_CLEAN:
			return { product: {} as Product };
		default:
			return state;
	}
};
