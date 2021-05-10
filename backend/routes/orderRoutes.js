import express from "express";
import { addOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
const routes = express.Router();

routes.route("/").post(protect, addOrder);

export default routes;
