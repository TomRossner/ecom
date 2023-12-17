import { useContext } from "react";
import { OrdersContext, IOrdersContext } from "../context/OrdersContext";

// Custom hook to make use of the CartContext
const useOrders = (): IOrdersContext => {
    const context = useContext(OrdersContext);

    if (!context) {
        throw new Error('useCart must be inside CartProvider.')
    }

    return context;
}

export default useOrders;