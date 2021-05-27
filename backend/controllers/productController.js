import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 8;
	const page = Number(req.query.pageNumber) || 1;
	const keyword = req.query.keyword
		? { name: { $regex: req.query.keyword, $options: "i" } }
		: {};
	const count = await Product.countDocuments({ ...keyword });
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip((page - 1) * pageSize);
	res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
	const { name, category, brand, image, price, description, inStock } =
		req.body;
	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.image = image;
		product.category = category;
		product.brand = brand;
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

const createReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;
	const product = await Product.findById(req.params.id);

	if (product) {
		const existedReview = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);

		if (existedReview) {
			res.status(400);
			throw new Error("Product already reviewed");
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((acc, r) => acc + r.rating, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json("Review added");
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
	createReview,
};
