import React from 'react';
import { BsTrash3Fill } from "react-icons/bs";
import useCart from '../hooks/useCart';
import { ICartItem } from '../utils/interfaces';

interface ICartItemProps {
    item: ICartItem;
}

const CartItem = ({item}: ICartItemProps) => {
    const {removeItem, decreaseQuantity, increaseQuantity} = useCart();
    const {id, title, price, quantity, thumbnail} = item;

  return (
    <div key={id} className="p-4 rounded bg-slate-300 max-w-xs">
        <div className="h-60 flex justify-center items-center bg-white rounded">
            <img
                src={thumbnail}
                alt={title}
                width={200}
                height={120}
                className="rounded max-w-xs h-90 mx-auto"
            />
        </div>
        <p className="text-black">{title}</p>
        <p className="text-black">${price}</p>
        <div className="flex items-center text-black gap-3">Qty: 
            <div className="flex items-center">
                <button type="button" className="px-3 py-1 rounded-l text-black text-xl bg-slate-200 hover:bg-slate-400" onClick={() => increaseQuantity(id)}>+</button>
                <span className="px-3 py-2 bg-slate-200 text-black text-sm">{quantity}</span>
                <button type="button" className="px-3 py-1 rounded-r text-black text-xl bg-slate-200 hover:bg-slate-400" onClick={() => decreaseQuantity(id)}>-</button>
            </div>
        </div>
        <button type="button" onClick={() => removeItem(id)} className="bg-red-400 rounded p-2 mx-auto hover:bg-red-500 mt-2" title='Remove from cart'><BsTrash3Fill/></button>
    </div>
  )
}

export default CartItem;