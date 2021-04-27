interface Product {
	_id: number;
	name: string;
	image: string;
	info: string;
	category: string;
	brand: string;
	currency: string;
	price: number;
	inStock: number;
	rating: number;
	numReviews: number;
	description: string;
}

interface AppState {
	products: Array<Product>;
	loading: boolean;
	error: any;
}
