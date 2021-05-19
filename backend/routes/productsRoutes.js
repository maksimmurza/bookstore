import express from "express";
import {
	getProducts,
	getProductById,
	deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.route("/").get(getProducts);
routes.route("/:id").get(getProductById).delete(protect, admin, deleteProduct);

export default routes;
