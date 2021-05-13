import express from "express";
import {
	addOrder,
	getOrderById,
	updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
const routes = express.Router();

routes.route("/").post(protect, addOrder);
routes.route("/:id").get(protect, getOrderById);
routes.route("/:id/pay").put(protect, updateOrderToPaid);

export default routes;
