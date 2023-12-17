'use client'

import Link from "next/link";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import useCart from "../hooks/useCart";
import { CARD_NUMBER_REGEX, EMAIL_REGEX, ID_REGEX, NAME_REGEX, PHONE_NUMBER_REGEX, SECURITY_CODE_REGEX } from "../utils/regex";
import { CARD_NUMBER_LENGTH, ID_LENGTH, NAME_MAX_LENGTH, NAME_MIN_LENGTH, PHONE_NUMBER_MAX_LENGTH, PHONE_NUMBER_MIN_LENGTH, SECURITY_CODE_LENGTH } from "../utils/constants";
import { useEffect, useRef, useState } from "react";
import { saveOrder } from "../services/api";
import { ICart, IValues } from "../utils/interfaces";
import { clearCart } from "../utils/localStorage";
import useOrders from "../hooks/useOrders";

// Default form values object.
const defaultValues: IValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    id: '',
    cardNumber: '',
    securityCode: '',
    expiryDate: null
}

export default function Checkout() {
    const {
        register,
        handleSubmit,
        setFocus,
        getValues,
        reset,
        formState: {
            errors
        }
    } = useForm({
        defaultValues: defaultValues
    });

    const {cart, emptyCart} = useCart();
    const {getOrders, setLastOrder} = useOrders();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const orderCompleteBtnRef = useRef<HTMLAnchorElement | null>(null);

    // Confirms order. Saves order in DB and updates isLoading accordingly.
    const confirmOrder = async (cart: ICart): Promise<void> => {
        setIsLoading(true);
        
        const email = getValues('email');

        const order = await saveOrder(cart, email); // Save to DB

        setLastOrder(order); // Set last order

        getOrders(email); // Get orders with email
        emptyCart(); // From state
        clearCart(); // From LocalStorage
        reset(); // Reset form fields
        
        setIsLoading(false);

        // Navigates to Order-complete page.
        if (orderCompleteBtnRef.current) {
            orderCompleteBtnRef.current.click();
        }
    }

    // Focuses on first input field on component mount.
    useEffect(() => {
        setFocus('firstName');
    }, [])

    return (
        <section id="checkout" className="bg-white h-screen">
            <Header text="Checkout"/>

            <form method="post" action={'/confirm_order/'} id="checkoutForm" onSubmit={handleSubmit(() => confirmOrder(cart!))} className="flex flex-col gap-2 w-1/2 m-auto rounded p-5 bg-white">
                <h2 className="font-bold text-slate-600 text-xl">Personal information</h2>
                
                <input
                    type="text"
                    {...register('firstName',
                        {
                            required: true,
                            pattern: NAME_REGEX,
                            minLength: {
                                message: `Must contain at least ${NAME_MIN_LENGTH} letters`,
                                value: NAME_MIN_LENGTH
                            },
                            maxLength: {
                                message: `Must contain less than ${NAME_MAX_LENGTH} letters`,
                                value: NAME_MAX_LENGTH
                            }
                        })
                        
                    }
                    placeholder="First name"
                    className={`border-2 rounded outline-indigo-500 px-2 text-black`}
                />
                {errors.firstName?.message && <p className="text-red-600 px-2 py-1 rounded bg-red-300">{errors.firstName?.message}</p>}

                <input
                    type="text"
                    {...register('lastName',
                        {
                            required: true,
                            pattern: NAME_REGEX,
                            minLength: {
                                message: `Must contain at least ${NAME_MIN_LENGTH} letters`,
                                value: NAME_MIN_LENGTH
                            },
                            maxLength: {
                                message: `Must contain less than ${NAME_MAX_LENGTH} letters`,
                                value: NAME_MAX_LENGTH
                            }
                        })
                    }
                    placeholder="Last name"
                    className="border-2 rounded outline-indigo-500 px-2 text-black"
                />
                {errors.lastName?.message && <p className="text-red-600 px-2 py-1 rounded bg-red-300">{errors.lastName?.message}</p>}

                <input
                    type="email"
                    {...register('email',
                        {
                            required: true,
                            pattern: EMAIL_REGEX
                        })
                    }
                    placeholder="Email"
                    className="border-2 rounded outline-indigo-500 px-2 text-black"
                />
                {errors.email?.message && <p className="text-red-600 px-2 py-1 rounded bg-red-300">{errors.email?.message}</p>}

                <input
                    type="tel"
                    {...register('phoneNumber',
                        {
                            maxLength: PHONE_NUMBER_MAX_LENGTH, // +972584844789 = 13
                            minLength: {
                                message: `Must contain ${PHONE_NUMBER_MIN_LENGTH} digits`,
                                value: PHONE_NUMBER_MIN_LENGTH
                            },
                            required: true,
                            pattern: PHONE_NUMBER_REGEX
                        }
                    )}
                    placeholder="Phone number"
                    className="border-2 rounded outline-indigo-500 px-2 text-black"
                />
                {errors.phoneNumber?.message && <p className="text-red-600 px-2 py-1 rounded bg-red-300">{errors.phoneNumber?.message}</p>}



                <div className="my-5 w-full" />



                <h2 className="font-bold text-slate-600 text-xl">Payment method</h2>

                <input
                    type="text"
                    {...register('cardNumber',
                        {
                            required: true,
                            pattern: CARD_NUMBER_REGEX,
                            minLength: {
                                message: `Must contain ${CARD_NUMBER_LENGTH} digits`,
                                value: CARD_NUMBER_LENGTH
                            },
                            maxLength: {
                                message: `Must contain ${CARD_NUMBER_LENGTH} digits`,
                                value: CARD_NUMBER_LENGTH
                            }
                        })
                    }
                    placeholder="Card number"
                    className="border-2 rounded outline-indigo-500 px-2 text-black"
                />
                {errors.cardNumber?.message && <p className="text-red-600 px-2 py-1 rounded bg-red-300">{errors.cardNumber?.message}</p>}

                <input
                    type="month"
                    {...register('expiryDate',
                        {
                            required: true
                        })
                    }
                    placeholder="Expiry date"
                    className="border-2 rounded outline-indigo-500 px-2 text-black"
                />
                {errors.expiryDate?.message && <p className="text-red-600 px-2 py-1 rounded bg-red-300">{errors.expiryDate?.message}</p>}

                <input
                    type="tel"
                    {...register('securityCode',
                        {
                            required: true,
                            pattern: SECURITY_CODE_REGEX,
                            minLength: {
                                message: `Must contain ${SECURITY_CODE_LENGTH} digits`,
                                value: SECURITY_CODE_LENGTH
                            },
                            maxLength: {
                                message: `Must contain ${SECURITY_CODE_LENGTH} digits`,
                                value: SECURITY_CODE_LENGTH
                            }
                        })
                    }
                    placeholder="Security code"
                    className="border-2 rounded outline-indigo-500 px-2 text-black"
                />
                {errors.securityCode?.message && <p className="text-red-600 px-2 py-1 rounded bg-red-300">{errors.securityCode?.message}</p>}

                <input
                    type="tel"
                    {...register('id',
                        {
                            required: true,
                            pattern: ID_REGEX,
                            minLength: {
                                message: `Must contain ${ID_LENGTH} digits`,
                                value: ID_LENGTH
                            },
                            maxLength: {
                                message: `Must contain ${ID_LENGTH} digits`,
                                value: ID_LENGTH
                            }
                        })
                    }
                    placeholder="ID number"
                    className="border-2 rounded outline-indigo-500 px-2 text-black"
                />
                {errors.id?.message && <p className="text-red-600 px-2 py-1 rounded bg-red-300">{errors.id?.message}</p>}

                <p className="text-black w-full text-end mt-5 px-5 font-bold">
                    Total price: 
                    <span className="font-normal text-black"> ${cart?.totalPrice}</span>
                </p>

                <button type="submit" disabled={isLoading} className={`text-blue-400 font-bold text-xl ${!isLoading ? 'bg-yellow-300' : 'bg-yellow-200'} rounded py-2 hover:bg-yellow-400 mt-5`}>Pay now</button>
                <Link href={'/cart'} className="px-4 py-2 bg-blue-400 rounded text-center w-full block mx-auto">Back to cart</Link>
            </form>

            <Link hidden type="button" href={'/order-complete'} ref={orderCompleteBtnRef}></Link>
        </section>
    )
}