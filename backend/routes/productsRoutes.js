import express from "express";
import {
	getProducts,
	getProductById,
} from "../controllers/productController.js";

const routes = express.Router();

routes.route("/").get(getProducts);
routes.route("/:id").get(getProductById);

export default routes;
