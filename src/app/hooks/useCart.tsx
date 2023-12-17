import { useContext } from "react";
import { CartContext, ICartContext } from "../context/CartContext";

// Custom hook to make use of the CartContext
const useCart = (): ICartContext => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be inside CartProvider.')
    }

    return context;
}

export default useCart;