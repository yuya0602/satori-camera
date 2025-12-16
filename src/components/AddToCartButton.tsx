'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { CartItemType } from '@/lib/cart';

interface AddToCartButtonProps {
    productId: string;
    title: string;
    price: number;
    rentalPrice?: number;
    image?: string;
    type: CartItemType;
    rentalDays?: number;
}

export default function AddToCartButton({
    productId,
    title,
    price,
    rentalPrice,
    image,
    type,
    rentalDays,
}: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = () => {
        if (isAdded) return;

        const itemPrice = type === 'rental' && rentalPrice ? rentalPrice : price;

        addToCart({
            productId,
            title,
            price: itemPrice,
            type,
            image,
            rentalDays: type === 'rental' ? (rentalDays || 1) : undefined,
        });

        setIsAdded(true);

        // 2秒後に元に戻す
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    if (type === 'purchase') {
        return (
            <button
                onClick={handleClick}
                disabled={isAdded}
                className={`group relative w-full flex items-center justify-center px-8 py-5 text-base font-bold text-white transition-all duration-300 border rounded-xl backdrop-blur-md overflow-hidden
                    ${isAdded
                        ? 'bg-green-500/20 border-green-400/50 scale-[1.02]'
                        : 'bg-white/10 border-white/20 hover:bg-white/20 hover:scale-[1.02] hover:border-white/40'
                    }`}
            >
                {!isAdded && (
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-full group-hover:h-96 opacity-10 mb-32 ml-24"></span>
                )}

                {isAdded ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="relative tracking-widest text-green-100">ADDED TO CART</span>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="relative tracking-widest">ADD TO CART</span>
                    </>
                )}
            </button>
        );
    }

    // Rental button
    return (
        <button
            onClick={handleClick}
            disabled={isAdded}
            className={`group relative w-full flex items-center justify-center px-8 py-5 text-base font-bold text-white transition-all duration-300 border rounded-xl backdrop-blur-md overflow-hidden
                ${isAdded
                    ? 'bg-green-500/20 border-green-400/50 scale-[1.02]'
                    : 'bg-purple-500/10 border-purple-400/30 hover:bg-purple-500/20 hover:scale-[1.02] hover:border-purple-400/50'
                }`}
        >
            {!isAdded && (
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-purple-500 rounded-full group-hover:w-full group-hover:h-96 opacity-15 mb-32 ml-24"></span>
            )}

            {isAdded ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="relative tracking-widest text-green-100">ADDED TO CART</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 relative text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="relative tracking-widest">RENT THIS ITEM</span>
                </>
            )}
        </button>
    );
}
