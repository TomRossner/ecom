'use client'

import { Suspense, useEffect, useState } from "react";
import Header from "../components/Header";
import { getProducts } from "../services/api";
import ShopItem from "../components/ShopItem";
import { IShopItem } from "../utils/interfaces";
import { TElectronic } from "../utils/types";
import ShopSkeleton from "../components/ShopSkeleton";

export default function Shop() {
    const [electronics, setElectronics] = useState<IShopItem[] | null>(null);
    const [products, setProducts] = useState<IShopItem[] | null>(null);

    // Takes an array and filters the electronic devices which are represented by the categories 'laptops' and 'smartphones'.
    const filterCategory = (products: IShopItem[], categories: TElectronic): IShopItem[] => {
        // Maps over the categories and filters the product that match the category. Returns 2 arrays in this case. 
        const filteredProducts = categories.map((category: string) => products.filter((product: any) => product.category === category));
        
        // Returning merged arrays.
        return [...filteredProducts[0], ...filteredProducts[1]]; // or filteredProducts[0].concat(filteredProducts[1]);
    }

    // Fetches products from API on component mount.
    useEffect(() => {
        const fetchProducts = async (): Promise<void> => {
            const {data: fetchedProducts} = await getProducts();
            setProducts(fetchedProducts);
        }

        fetchProducts();
    }, [])

    // Sets up the electronics array on component mount when products is not null.
    useEffect(() => {
        if (products) setElectronics(filterCategory(Array.from(products), ['laptops', 'smartphones']));
    }, [products])

    return (
        <section id="shop" className="bg-white min-h-screen">
            <Header text="Shop"/>

                {electronics?.length
                    ?   (
                            <div className="flex gap-5 flex-wrap p-20 justify-center">
                                {electronics?.map(
                                    (product: IShopItem, idx: number) => <ShopItem item={product} key={idx}/>
                                )}
                            </div>
                        )
                    : <ShopSkeleton/>
                }    
        </section>
    )
}