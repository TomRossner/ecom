'use client'

import Link from "next/link";
import Logo from "./Logo";
import { MdMenu } from "react-icons/md";
import { useState, Suspense } from "react";
import { RxCross2 } from "react-icons/rx";
import useCart from "../hooks/useCart";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const {cart} = useCart();

    // Toggles mobile menu
    const toggleMenu = (): void => {
        setMenuOpen(!menuOpen);
    }

    // Closes mobile menu
    const closeMenu = (): void => {
        setMenuOpen(false);
    }

    return (
        <nav id="navbarContainer" className="flex items-center sticky w-screen bg-black relative py-4 top-0 z-50">

            <Logo/>

            <div id="navbarMenu" className="hidden sm:flex flex-row-reverse justify-between items-center grow w-96 pl-5 pr-8">
                
                <ul className="flex gap-2">
                    <Link href={'/cart'} className="flex items-center gap-2 px-2 py-1 hover:text-blue-500 transition-all duration-75">Cart
                            {<span className="text-blue-400">
                                <Suspense fallback={(0)}>
                                    ({cart?.items?.length ? cart.items.length : 0})
                                </Suspense>
                            </span>}
                    </Link>

                    <Link href={'/orders'} className="flex items-center gap-2 px-2 py-1 hover:text-blue-500 transition-all duration-75">Orders</Link>
                </ul>

                <div className="grow" />
                
                <ul className="flex gap-2">
                    <Link href={'/'} className=" px-2 py-1 hover:text-blue-500 transition-all duration-75">Home</Link>
                    <Link href={'/shop'} className=" px-2 py-1 hover:text-blue-500 transition-all duration-75">Shop</Link>
                </ul>

            </div>

            <div id="hamburger" className="flex justify-center items-center sm:hidden z-40 fixed pr-5 right-0" onClick={toggleMenu}>
                {menuOpen ? <RxCross2 className="text-3xl text-black"/> : <MdMenu className="text-white text-3xl"/>}
            </div>

            {menuOpen
                ?   (
                        <div id="mobileMenu" className={`flex flex-col items-center pt-32 text-xl gap-10 w-screen h-screen fixed transition-all z-0 bg-slate-200 ${menuOpen ? 'top-0' : 'inset-past-top'}`}>
                            <Link
                                href={'/'}
                                className="hover:bg-slate-300 w-full py-2 text-center text-black active:text-blue-400"
                                onClick={closeMenu}
                            >
                                Home
                            </Link>

                            <Link
                                href={'/shop'}
                                className="hover:bg-slate-300 w-full py-2 text-center text-black active:text-blue-400"
                                onClick={closeMenu}
                            >
                                Shop
                            </Link>

                            <Link
                                href={'/cart'}
                                className="hover:bg-slate-300 w-full py-2 text-center text-black active:text-blue-400"
                                onClick={closeMenu}
                            >
                                Cart
                            </Link>

                            <Link
                                href={'/orders'}
                                className="hover:bg-slate-300 w-full py-2 text-center text-black active:text-blue-400"
                                onClick={closeMenu}
                            >
                                Orders
                            </Link>
                        </div>
                    )
                : null
            }
        </nav>
    )
}