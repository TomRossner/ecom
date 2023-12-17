import axios, { AxiosResponse } from "axios";
import { ICart, IOrder } from "./interfaces";
import { TCart } from "./types";

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

// Adds order to order history in LocalStorage.
export const addOrderToHistory = (order: IOrder): void => {
    const stringifiedOrder: string = JSON.stringify(order);

    return localStorage.setItem('Ecom_Order_History', stringifiedOrder);
}

// Fetches order history from LocalStorage.
export const fetchOrderHistory = (): IOrder | null => {
    try {
        const stringifiedOrderHistory: string | null = localStorage.getItem('Ecom_Order_History');
        return JSON.parse(stringifiedOrderHistory!) as IOrder;
    } catch (error) {
        console.error(error);
        return null;
    }
}