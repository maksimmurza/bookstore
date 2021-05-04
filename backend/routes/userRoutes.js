import express from "express";
import { authUsers, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const routes = express.Router();

routes.post("/login", authUsers);
routes.route("/profile").get(protect, getUserProfile);

export default routes;
