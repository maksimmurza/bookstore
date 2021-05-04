import express from "express";
import {
	authUsers,
	registerUser,
	getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const routes = express.Router();

routes.post("/login", authUsers);
routes.route("/").post(registerUser);
routes.route("/profile").get(protect, getUserProfile);

export default routes;
