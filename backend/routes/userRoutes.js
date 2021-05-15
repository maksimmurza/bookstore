import express from "express";
import {
	authUsers,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const routes = express.Router();

routes.post("/login", authUsers);
routes.route("/").post(registerUser).get(protect, admin, getUsers);
routes
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
routes.route("/:id").delete(protect, admin, deleteUser);

export default routes;
