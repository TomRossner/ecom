import React from 'react';
import { ICartItem, IOrder } from '../utils/interfaces';

interface IOrderProps {
    order: IOrder;
}

const Order = ({order}: IOrderProps) => {
    const {items} = order

  return (
    <div className="flex flex-col gap-3 p-4 w-full">
        {items.map((item: ICartItem, idx: number) => {
            return (
                <div key={idx}>
                    <p className="bg-stone-100 py-1 px-2 rounded w-90">{item.title}</p>
                    <p className="flex gap-4 items-center px-2">
                        <span>Price: ${item.price}</span>
                        <span>Qty: {item.quantity}</span>
                    </p>
                </div>
            )
        })}
        <div className='flex items-center justify-between bg-stone-100 py-1 px-2 rounded'>
            <p className="font-bold px-2">Order price: ${order.totalPrice}</p>
            <p className='font-bold px-2'>Order ID:
                <span className='font-normal'> {order.orderId}</span>
            </p>
        </div>
    </div>
  )
}

export default Order;