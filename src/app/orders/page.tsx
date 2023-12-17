'use client'

import { useEffect } from "react";
import useCart from "../hooks/useCart"
import { IOrder } from "../utils/interfaces";
import Header from "../components/Header";
import OrderContainer from "../components/OrderContainer";

export default function OrdersHistory() {
    const {orders, getOrders, lastOrder} = useCart();

    // Get past orders using last order's email.
    useEffect(() => {
        if (lastOrder) getOrders(lastOrder.email);
    }, [lastOrder])

    return (
        <>
            <section id="ordersHistory" className="bg-white text-black min-h-screen">
                <Header text="Order History"/>

                {orders?.length
                    ? (
                        <>
                            <p className="w-screen font-bold px-4 py-3">
                                Total orders: {orders?.length}
                            </p>

                            {orders?.length && orders.map(
                                (order: IOrder, index: number) => 
                                    <OrderContainer
                                        key={index}
                                        index={index}
                                        order={order}
                                    />
                            )}
                        </>
                    ) : <p className="text-center text-4xl font-bold text-stone-800 py-20">
                            No orders
                        </p>
                }
            </section>
        </>
    )
}