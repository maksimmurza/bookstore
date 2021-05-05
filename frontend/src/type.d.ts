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
	userInfo: UserInfo | null;
	cartItems: Array<[Product, number]>;
	products: Array<Product>;
	product: Product;
	loading: boolean;
	error: any;
}

interface UserInfo {
	_id: string;
	name: string;
	email: string;
	isAdmin: boolean;
	token: object;
}
