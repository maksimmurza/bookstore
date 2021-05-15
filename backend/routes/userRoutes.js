import express from "express";
import {
	authUsers,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const routes = express.Router();

routes.post("/login", authUsers);
routes.route("/").post(registerUser).get(protect, admin, getUsers);
routes
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

export default routes;
