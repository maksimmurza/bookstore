import express from "express";
import {
	authUsers,
	registerUser,
	getUserProfile,
	updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const routes = express.Router();

routes.post("/login", authUsers);
routes.route("/").post(registerUser);
routes
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

export default routes;
