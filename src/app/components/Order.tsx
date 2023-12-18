import React from 'react';
import { ICartItem, IOrder } from '../utils/interfaces';

interface IOrderProps {
    order: IOrder;
}

const Order = ({order}: IOrderProps) => {
    const {items, orderId, totalPrice} = order;

  return (
    <div className="flex flex-col gap-3 p-4 w-full">
        {items.map((item: ICartItem, idx: number) => {
            const {title, price, quantity} = item;

            return (
                <div key={idx}>
                    <p className="bg-stone-100 py-1 px-2 rounded w-90">{title}</p>
                    <p className="flex gap-4 items-center px-2">
                        <span>Price: ${price}</span>
                        <span>Qty: {quantity}</span>
                    </p>
                </div>
            )
        })}
        <div className='flex items-center justify-between bg-stone-100 py-1 px-2 rounded'>
            <p className="font-bold px-2">Order price: ${totalPrice}</p>
            <p className='font-bold px-2'>Order ID:
                <span className='font-normal'> {orderId}</span>
            </p>
        </div>
    </div>
  )
}

export default Order;