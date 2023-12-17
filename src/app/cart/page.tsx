'use client'

import useCart from "../hooks/useCart";
import Link from "next/link";
import Header from "../components/Header";
import CartItem from "../components/CartItem";
import { ICartItem } from "../utils/interfaces";

export default function Cart() {
    const {cart} = useCart();

    return (
        <section id="cart" className="w-screen min-h-screen bg-white flex flex-col items-center pb-10">
            <Header text={'My Cart'}/>

            <div id="itemsList" className="flex gap-5 items-center flex-wrap justify-center h-auto bg-white py-20">
                {cart?.items?.length
                    ? cart.items.map((item: ICartItem) =>
                        <CartItem item={item} key={item.id}/>)
                    : <p className="text-center text-4xl font-bold text-stone-800 py-20">Cart is empty :(</p>
                }
            </div>


            {cart?.items?.length
                ?   (
                        <>
                            <p className="text-black text-xl font-bold py-4">Total price: ${cart?.totalPrice}</p>

                            <div className="flex flex-col gap-3 w-90 sm:w-1/5 items-center">
                                <Link href={'/shop'} className="px-4 py-2 block bg-yellow-500 drop-shadow-xl text-center w-full rounded hover:bg-yellow-400 text-center w-96 sm:w-96">Continue shopping</Link>
                                <Link href={'/checkout'} className="px-4 py-2 block bg-lime-700 drop-shadow-xl text-center w-full rounded hover:bg-lime-600 text-center w-96 sm:w-96">Proceed to checkout</Link>
                            </div>
                        </>
                    )
                : null
            }

        </section>
    )
}