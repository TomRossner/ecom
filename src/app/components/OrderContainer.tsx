import React from 'react';
import { IOrder } from '../utils/interfaces';
import Order from './Order';

interface IOrderContainerProps {
    order: IOrder;
    index: number;
}

const OrderContainer = ({order, index}: IOrderContainerProps) => {

  return (
    <div className="flex w-full items-center border-4">
        <p className="hidden md:block font-bold text-xl p-8">{index + 1}</p>
        <Order order={order}/>
    </div>
  )
}

export default OrderContainer;