'use client'

import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { clearCart, fetchCart, saveCart } from "../utils/localStorage";
import { TCart, TOrder } from "../utils/types";
import { ICartItem, IOrder, IShopItem } from "../utils/interfaces";
import { fetchOrders } from "../services/api";

// Interface representing the CartContext used when initializing createContext.
export interface ICartContext {
    cart: TCart;
    orders: IOrder[] | null;
    lastOrder: TOrder;
    setLastOrder: (order: TOrder) => void;
    emptyCart: () => void;
    getOrders: (email: string) => void;
    updateCart: (newItem: IShopItem) => void;
    removeItem: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    increaseQuantity: (id: number) => void;
}

// Initializing CartContext.
export const CartContext = createContext<ICartContext | null>(null);

// Cart context provider.
export const CartProvider = (props: PropsWithChildren) => {
    const [cart, setCart] = useState<TCart>(fetchCart()); // Get items from LocalStorage
    const [orders, setOrders] = useState<IOrder[] | null>(null);
    const [lastOrder, setLastOrder] = useState<TOrder>(null);

    // updateCart is responsible for 3 things:
    //
    // 1. If an item is being added to an empty cart, it creates a new cart and adds that new item.
    // 2. If an item is already in the cart, it updates that cart item's quantity while also updating the total price.
    // 3. If an item is added to an existing cart and that cart does not already have that item saved, it adds that new item to the cart, while also updating the total price. 
    const updateCart = (newItem: IShopItem): void => {
        const {id} = newItem;

        if (!cart || !cart.items.length) {
            createNewCart(newItem);
        } else {

            // Checks if that item exists in the cart using it's id.
            const isAlreadyInCart: boolean = cart!.items.some((item: ICartItem) => item.id === id);
    
            if (isAlreadyInCart) {
                setCart(
                    {
                        ...cart,
                        items: updateCartItemQuantity(cart.items, id),
                        totalPrice: calculateTotalPrice(cart.items)
                    }
                )
            } else if (!isAlreadyInCart) {
                addNewItem(newItem);
            }
        }
    }

    // Creates a new cart object -- adding the new item AND setting the new total price which is the item's price, since there are no other items in the cart.
    const createNewCart = (newItem: IShopItem): void => {
        const {price} = newItem;

        const newCartItem: ICartItem = createNewCartItem(newItem);

        setCart(
            {
                items: [newCartItem],
                totalPrice: price
            }
        )
    }

    // Calculates the total price based on the items' price multiplied by their quantity in the cart.
    const calculateTotalPrice = (items: ICartItem[]): number => {
        return items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0)
    }

    // Returns an updated cart items array after updating the quantity of the existing item which has been previously added to the cart.
    const updateCartItemQuantity = (items: ICartItem[], id: number): ICartItem[] => {
        return items.map((item: ICartItem) => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            } else return item;
        })
    }

    // Adds a new item to an existing cart, while also updating the total price.
    const addNewItem = (newItem: IShopItem): void => {
        const {price} = newItem;

        const newCartItem: ICartItem = createNewCartItem(newItem);

        if (cart) {
            setCart(
                {
                    ...cart,
                    items: [...cart.items, newCartItem],
                    totalPrice: cart.totalPrice ? cart.totalPrice + price : price
                }
            )
        } else createNewCart(newItem);

    }

    // Returns new cart item object. 
    const createNewCartItem = (newItem: IShopItem): ICartItem => {
        const {title, id, price, description, thumbnail, stock} = newItem;

        const newCartItem: ICartItem = {
            title,
            id,
            price,
            description,
            thumbnail,
            stock,
            quantity: 1,
        }

        return newCartItem;
    }

    // Removes the target item from the cart. Recalculates the total price based on what's left on the cart.
    const removeItem = (id: number): void => {
        if (!cart) throw new Error('Cart is null');

        const filteredItems = cart?.items.filter((item: ICartItem) => item.id !== id);

        setCart({
            ...cart,
            items: filteredItems,
            totalPrice: calculateTotalPrice(filteredItems)
        })
    }

    // Decreases the quantity of the target cart item by 1. If the new quantity equals 0, it removes the item from the cart.
    const decreaseQuantity = (id: number): void => {
        if (!cart) throw new Error('Cart is null');

        const targetItem: ICartItem = cart.items.find((item: ICartItem) => item.id === id) as ICartItem;

        if ((targetItem?.quantity - 1) === 0) {
            removeItem(id);
        } else {
            const updatedCartItems: ICartItem[] = cart.items.map((item: ICartItem) => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    }
                } else return item;
            })
            
            setCart(
                {
                    ...cart,
                    items: updatedCartItems,
                    totalPrice: calculateTotalPrice(updatedCartItems)
                }
            )
        }
    }

    // Increases the quantity of the target cart item by 1.
    const increaseQuantity = (id: number): void => {
        if (!cart) throw new Error('Cart is null');

        const updatedCartItems: ICartItem[] = cart.items.map((item: ICartItem) => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            } else return item;
        })
        
        setCart(
            {
                ...cart,
                items: updatedCartItems,
                totalPrice: calculateTotalPrice(updatedCartItems)
            }
        )
    }

    // Empty cart.
    const emptyCart = (): void => {
        setCart(null);
    }

    // Get orders from DB and populate the orders state.
    const getOrders = async (email: string): Promise<void> => {
        const pastOrders = await fetchOrders(email);
        setOrders(pastOrders);
    }

    // Takes care of LocalStorage.
    // Clears existing cart if cartItems is empty.
    // Saves cart every time cart changes. 
    useEffect(() => {
        if (!cart) return;

        if (!cart.items.length) return clearCart();

        saveCart(cart);
    }, [cart])

    // Value passed to the context provider.
    const value: ICartContext = {
        cart,
        orders,
        lastOrder,
        setLastOrder,
        emptyCart,
        getOrders,
        updateCart,
        removeItem,
        increaseQuantity,
        decreaseQuantity
    }

    return (
        <CartContext.Provider value={value}>
            {props.children}
        </CartContext.Provider>
    )
}