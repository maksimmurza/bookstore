import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { productListReducer, productReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

const cartItemsFromStorage: Array<[Product, number]> = localStorage.getItem(
	"cartItems"
)
	? (JSON.parse(localStorage.getItem("cartItems") as string) as Array<
			[Product, number]
	  >)
	: ([] as Array<[Product, number]>);

const preloadedState: any = {
	cart: {
		cartItems: cartItemsFromStorage,
	},
};

export const store = configureStore({
	reducer: {
		productList: productListReducer,
		productDetails: productReducer,
		cart: cartReducer,
	},
	preloadedState,
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>;
