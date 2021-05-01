import { AnyAction } from "redux";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants";

export const cartReducer = (
	state: Pick<AppState, "cartItems"> = { cartItems: [] },
	action: AnyAction
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const inCart = state.cartItems.find(
				(p) => p[0]._id === action.payload[0]._id
			);
			if (inCart) {
				return {
					cartItems: state.cartItems.map((item) =>
						item[0]._id === action.payload[0]._id
							? action.payload
							: item
					),
				};
			} else {
				return { cartItems: [...state.cartItems, action.payload] };
			}
		case CART_REMOVE_ITEM:
			return {
				cartItems: state.cartItems.filter(
					(item) => item[0]._id !== action.payload
				),
			};
		default:
			return state;
	}
};
