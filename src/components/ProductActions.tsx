'use client';

import { useState } from 'react';
import AddToCartButton from './AddToCartButton';

interface ProductActionsProps {
    productId: string;
    title: string;
    price: number;
    rentalPrice?: number;
    image?: string;
}

export default function ProductActions({
    productId,
    title,
    price,
    rentalPrice,
    image,
}: ProductActionsProps) {
    // 価格文字列から数値を抽出
    const parsePrice = (priceStr: string | number): number => {
        if (typeof priceStr === 'number') return priceStr;
        const cleanPrice = priceStr.replace(/[¥,]/g, '');
        return parseInt(cleanPrice, 10) || 0;
    };

    const numericPrice = typeof price === 'string' ? parsePrice(price) : price;
    const numericRentalPrice = rentalPrice
        ? (typeof rentalPrice === 'string' ? parsePrice(rentalPrice) : rentalPrice)
        : undefined;

    const [rentalDays, setRentalDays] = useState(2);

    return (
        <div className="fade-up-element delay-500 space-y-4">
            {/* ADD TO CART ボタン */}
            <AddToCartButton
                productId={productId}
                title={title}
                price={numericPrice}
                rentalPrice={numericRentalPrice}
                image={image}
                type="purchase"
            />

            {/* RENT THIS ITEM ボタン */}
            {numericRentalPrice && numericRentalPrice > 0 && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-400">Rental Duration</label>
                        <div className="relative">
                            <select
                                value={rentalDays}
                                onChange={(e) => setRentalDays(parseInt(e.target.value))}
                                className="appearance-none bg-purple-500/10 border border-purple-500/30 text-purple-200 text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
                            >
                                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                                    <option key={day} value={day} className="bg-gray-900 text-gray-200">
                                        {day} {day === 1 ? 'Day' : 'Days'}
                                    </option>
                                ))}
                            </select>
                            <svg className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    <AddToCartButton
                        productId={productId}
                        title={title}
                        price={numericPrice}
                        rentalPrice={numericRentalPrice}
                        image={image}
                        type="rental"
                        rentalDays={rentalDays}
                    />
                    <p className="text-xs text-right text-purple-400/70">
                        Total: ¥{(numericRentalPrice * rentalDays).toLocaleString()}
                    </p>
                </div>
            )}

            <p className="text-center text-xs text-gray-500 mt-4">
                Free shipping on orders over ¥30,000.
            </p>
        </div>
    );
}
