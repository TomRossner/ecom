import { ICart, IOrder } from "./interfaces";
import { TCart, TOrder } from "./types";

// Saves cart to LocalStorage.
export const saveCart = (cart: ICart): void => {
    const stringifiedCart: string = JSON.stringify(cart);

    return localStorage.setItem('Ecom_Cart', stringifiedCart);
}

// Clears cart from LocalStorage
export const clearCart = (): void => {
    return localStorage.removeItem('Ecom_Cart');
}

// Fetches cart from LocalStorage. Returns null if no cart has been found.
export const fetchCart = (): TCart => {
    try {
        const stringifiedCart: string | null = localStorage.getItem('Ecom_Cart');
        return JSON.parse(stringifiedCart!) as TCart;
    } catch (error) {
        return null;
    }
}