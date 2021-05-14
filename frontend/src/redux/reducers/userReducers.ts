import { AnyAction } from "redux";
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_EDIT_REQUEST,
	USER_EDIT_SUCCESS,
	USER_EDIT_FAIL,
	USER_EDIT_RESET,
	USER_DETAILS_CLEAN,
} from "../constants";

export const userLoginReducer = (
	state: Partial<AppState> = {},
	action: AnyAction
) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload as UserInfo };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return { userInfo: null };
		default:
			return state;
	}
};

export const userRegisterReducer = (
	state: Partial<AppState> = {},
	action: AnyAction
) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userDetailsReducer = (
	state: Partial<AppState> = {},
	action: AnyAction
) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { loading: true };
		case USER_DETAILS_SUCCESS:
			return { loading: false, user: action.payload as UserInfo };
		case USER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case USER_DETAILS_CLEAN:
			return {};
		default:
			return state;
	}
};

export const userEditReducer = (
	state: Partial<AppState> = {},
	action: AnyAction
) => {
	switch (action.type) {
		case USER_EDIT_REQUEST:
			return { ...state, loading: true };
		case USER_EDIT_SUCCESS:
			return {
				loading: false,
				success: true,
				userInfo: action.payload as UserInfo,
			};
		case USER_EDIT_FAIL:
			return { loading: false, error: action.payload };
		case USER_EDIT_RESET:
			return {};
		default:
			return state;
	}
};
