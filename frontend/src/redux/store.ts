import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { productListReducer, productReducer } from "./reducers/productReducers";

export const store = configureStore({
	reducer: {
		productList: productListReducer,
		productDetails: productReducer,
	},
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
