'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function CartIcon() {
    const { itemCount } = useCart();

    return (
        <Link
            href="/cart"
            className="relative flex items-center text-gray-300 hover:text-white transition-colors"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
            </svg>
            {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                </span>
            )}
            <span className="ml-2 text-sm tracking-widest uppercase hidden md:inline">
                Cart ({itemCount})
            </span>
        </Link>
    );
}
