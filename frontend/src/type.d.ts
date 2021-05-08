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
	user: UserInfo;
	userInfo: UserInfo | null;
	cartItems: Array<[Product, number]>;
	shippingAddress: Address | null;
	products: Array<Product>;
	product: Product;
	loading: boolean;
	error: any;
	success: boolean;
}

interface UserInfo {
	_id: string;
	name: string;
	email: string;
	isAdmin: boolean;
	token: string;
}

interface Address {
	country: string;
	city: string;
	postalCode: string;
	address: string;
}
