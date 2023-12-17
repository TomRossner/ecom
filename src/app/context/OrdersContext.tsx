'use client'

import { PropsWithChildren, createContext, useState } from "react";
import { IOrder } from "../utils/interfaces"
import { TOrder } from "../utils/types";
import { fetchOrders } from "../services/api";

// Interface representing the Orders context.
export interface IOrdersContext {
    orders: IOrder[] | null;
    lastOrder: TOrder;
    setLastOrder: (order: TOrder) => void;
    getOrders: (email: string) => void;
}

// Initializing OrdersContext.
export const OrdersContext = createContext<IOrdersContext | null>(null);

// Orders context provider.
export const OrdersProvider = (props: PropsWithChildren) => {
    const [orders, setOrders] = useState<IOrder[] | null>(null);
    const [lastOrder, setLastOrder] = useState<TOrder>(null);

    // Get orders from DB and populate the orders state.
    const getOrders = async (email: string): Promise<void> => {
        const pastOrders = await fetchOrders(email);
        setOrders(pastOrders);
    }

    // Values passed to the provider.
    const values: IOrdersContext = {
        orders,
        lastOrder,
        setLastOrder,
        getOrders
    }

    return (
        <OrdersContext.Provider value={values}>
            {props.children}
        </OrdersContext.Provider>
    )
}