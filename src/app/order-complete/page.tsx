'use client'

import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import useOrders from "../hooks/useOrders";

export default function OrderComplete() {
    const {lastOrder} = useOrders();

    return (
        <>
            {lastOrder && (
                <div id="orderComplete" className="flex flex-col gap-5 bg-white items-center justify-center w-full relative top-0 h-screen">
                    <FaCheckCircle className='text-7xl text-lime-600 text-center'/>
                    <p className="text-lime-600 font-bold text-xl text-center">Order completed successfully</p>

                    
                        <div id="lastOrder" className="px-4 py-3 bg-slate-200 rounded items-center bg-slate-200">
                            <p className="text-black font-bold">
                                Email: 
                                <span className="font-normal"> {lastOrder.email}</span>
                            </p>
                            <p className="text-black font-bold">
                                Order ID: 
                                <span className="font-normal"> {lastOrder.orderId}</span>
                            </p>
                            <p className="text-black font-bold">
                                Total price:
                                <span className="font-normal"> ${lastOrder.totalPrice}</span>
                            </p>
                        </div>
                    

                    <Link href={'/shop'} className="px-4 py-2 text-center my-4 bg-blue-400 font-bold rounded hover:bg-blue-300 hover:scale-95 transition-all duration-75">Back to Shop</Link>
                </div>
            )}
        </>
    )
}