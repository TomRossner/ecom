import React from 'react';
import { IoMdStar } from 'react-icons/io';
import { FaCircle } from 'react-icons/fa';
import useCart from '../hooks/useCart';
import { IShopItem } from '../utils/interfaces';

interface IShopItemProps {
    item: IShopItem;
}

const ShopItem = ({item}: IShopItemProps) => {
    const {
        title,
        price: discountedPrice,
        discountPercentage,
        rating,
        thumbnail,
        stock
    } = item;

    const {updateCart} = useCart();

    // Calculates the full price based on the price and discount percentage values.
    const calculateFullPrice = (discountedPrice: number, percentage: number): number => {
        const fullPrice: number = discountedPrice + (discountedPrice * percentage / 100);
        
        // Returns non-decimal value. Ex: 123 and not 123.45.
        // Changing to toFixed(1) would result in 123.4 .
        // Changing to toFixed(2) would result in 123.45 .
        return Number(fullPrice.toFixed());
    }

    // Price before discount calculated based on price and discount percentage.
    const priceBeforeDiscount = calculateFullPrice(discountedPrice, discountPercentage as number);

    // Handle 'Add to cart' button.
    const handleAddToCart = (product: IShopItem): void => {
        updateCart(product);
        
        // Update stocks
        // updateStocks()
    }

  return (
    <div className="flex flex-col grow px-5 py-4 h-100 bg-slate-300 rounded max-w-xs gap-2">
        <div className="h-60 flex justify-center items-center bg-white rounded">
            <img
                src={thumbnail}
                alt={title}
                width={200}
                height={120}
                className="rounded max-w-xs h-90 mx-auto"
            />
        </div>

        <div className="flex flex-col">
            <div className="flex justify-between">
                <p className="truncate overflow-hidden text-black font-bold">{title}</p>
            </div>

            <div className="flex gap-2">
                <p className="text-black">Price: </p> 
                <p className="text-stone-400 line-through">${priceBeforeDiscount} </p>
                <p className="text-lime-600 font-bold">${discountedPrice}</p>

            </div>


        </div>

        <div className="grow h-12" />

        <div className="flex justify-between">
            <p className="text-black flex items-center gap-1">
                <span className="text-yellow-500 font-xl"><IoMdStar/></span>
                <span>{rating.toFixed(1)}/5</span>
            </p>
            {
                stock > 0
                ?   <span className={`flex items-center gap-1 text-right ${stock <= 10 ? 'text-red-300' : 'text-lime-600'}`}>
                        <FaCircle className="text-2xs"/>
                        {stock <= 10 ? `Only ${stock} left` : `In stock (${stock})`}
                    </span>
                :   <span className="text-red-600 flex gap-1 items-center">
                        <FaCircle className="text-2xs"/>
                        Out of stock
                    </span>
            }
        </div>

        <button
            onClick={() => handleAddToCart(item)}
            type="button"
            className="bg-lime-600 px-3 py-1 rounded mx-auto w-full hover:bg-lime-500 active:scale-95 transition-all duration-75"
        >
            Add to cart
        </button>
    </div>
  )
}

export default ShopItem;