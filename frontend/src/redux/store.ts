import { configureStore } from "@reduxjs/toolkit";
import { productListReducer } from "./reducers/productReducers";

export const store = configureStore({
	reducer: {
		productList: productListReducer,
	},
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
