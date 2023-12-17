import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../utils/constants';
import { v4 as uuid } from 'uuid';
import { IOrder } from '../utils/interfaces';
import { TCart } from '../utils/types';
import { getCSRFToken } from '../utils/csrf';

// Set default base URL.
axios.defaults.baseURL = API_URL;

// Sets common CSRF header
export const setCommonHeader = async (): Promise<void> => {
    const token: string = await getCSRFToken();
    
    axios.defaults.headers.common = {
        'X-CSRFToken': token
    }
}

setCommonHeader();

// Fetches products from DB.
export const getProducts = async (): Promise<AxiosResponse> => {
    try {
        return await axios.get('/products');
    } catch (error) {
        console.error(error);
        throw new Error(`Failed fetching from API (${API_URL}/products)`);
    }
}

// Creates Order object.
export const createOrder = (cart: TCart, email: string): IOrder => {
    const order: IOrder = {
        orderId: uuid(), // Generates unique id
        totalPrice: cart!.totalPrice,
        items: cart!.items,
        date: new Date(Date.now()),
        confirmed: true,
        email
    }

    return order;
}

// Saves order in DB.
export const saveOrder = async (cart: TCart, email: string): Promise<IOrder> => {
    try {
        // Order object.
        const order = createOrder(cart, email);

        // CSRF Token retrieved from Django template.
        const csrfToken = await getCSRFToken();
    
        const {data: orderData} = await axios.post('/confirm/', order, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            }
        });

        return orderData;
    } catch (error) {
        console.error(error);
        throw new Error('Failed saving order');
    }
}

// Fetches orders from DB.
export const fetchOrders = async (email: string): Promise<IOrder[] | null> => {
    try {
        const {data: {orders}} = await axios.post('/fetch-orders/', {email});
        return orders;
    } catch (error) {
        console.error(error);
        return null;
    }
}