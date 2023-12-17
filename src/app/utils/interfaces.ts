// Interfaces

// Component props interfaces can be found directly in the components files.

// Interface representing form values.
export interface IValues {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    id: string;
    cardNumber: string;
    securityCode: string;
    expiryDate: Date | null;
}

// Interface describing the cart item.
export interface ICartItem {
    title: string;
    price: number;
    quantity: number;
    description: string;
    id: number;
    thumbnail: string;
    inStock?: boolean;
    stock: number;
}

// Interface representing the cart, includes the saved items and the total price.
export interface ICart {
    items: ICartItem[];
    totalPrice: number;
}

// Interface representing a shop item
export interface IShopItem {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    thumbnail: string;
    images: string[];
    rating: number;
    discountPercentage?: number | undefined;
}

// Interface representing an Order object.
export interface IOrder {
    orderId: string;
    totalPrice: number;
    items: ICartItem[];
    date: Date;
    confirmed: boolean;
    email: string;
}