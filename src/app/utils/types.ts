import { ICart, IOrder } from "./interfaces";

// Types

// Type of the cart object which initially is null.
// Once an item is saved OR the cart is retrieved from the LocalStorage, the cart is no-longer null and is now an object representing the cart items and the total price.
export type TCart = ICart | null;

// Type of electronic device from products array.
export type TElectronic = ['laptops', 'smartphones'];

// Type representing the order object.
export type TOrder = IOrder | null;