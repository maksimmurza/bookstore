import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id).catch((error) => {
		res.status(404);
		throw new Error("Product not found");
	});

	res.json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove().catch((error) => {
			throw new Error("Error while removing");
		});
		res.json({ message: "Product removed" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}

	res.json(product);
});

export { getProducts, getProductById, deleteProduct };
