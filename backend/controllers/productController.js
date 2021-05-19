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

const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		user: req.user._id,
		name: "New name",
		info: "New info",
		category: "New category",
		image: "New image",
		rating: 0,
		numReviews: 0,
		brand: "New brand",
		price: 0,
		inStock: 0,
		description: "New description",
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
	const { name, info, category, image, price, description, inStock } =
		req.body;
	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.info = info;
		product.image = image;
		product.category = category;
		product.price = price;
		product.description = description;
		product.inStock = inStock;

		const updatedProduct = await product.save();
		res.status(201).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
};
