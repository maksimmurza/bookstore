import express from "express";
import { addOrder, getOrderById } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
const routes = express.Router();

routes.route("/").post(protect, addOrder);
routes.route("/:id").get(protect, getOrderById);

export default routes;
