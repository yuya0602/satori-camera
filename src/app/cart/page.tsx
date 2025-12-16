'use client';

import { useCart } from '@/contexts/CartContext';
import { getPurchaseItems, getRentalItems, formatCartPrice, calculatePurchaseTotal, calculateRentalTotal } from '@/lib/cart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, updateRentalDays, clearCart } = useCart();
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const purchaseItems = getPurchaseItems(cart);
    const rentalItems = getRentalItems(cart);
    const purchaseTotal = calculatePurchaseTotal(cart);
    const rentalTotal = calculateRentalTotal(cart);
    const grandTotal = purchaseTotal + rentalTotal;

    const handleCheckout = () => {
        router.push('/checkout/shipping');
    };

    if (cart.items.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center bg-[#050505]">
                <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none"></div>
                <div className="relative z-10 text-center max-w-md mx-auto">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
                    <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
                    <Link
                        href="/products"
                        className="inline-block px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                    >
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 relative">
            <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none"></div>

            {/* Background Effects */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full mix-blend-screen filter blur-[128px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full mix-blend-screen filter blur-[128px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Shopping Cart</h1>
                    <Link href="/products" className="text-sm text-gray-400 hover:text-white transition-colors">
                        Continued Shopping
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Purchase Items */}
                        {purchaseItems.length > 0 && (
                            <div className="bg-glass-100 border border-white/10 rounded-2xl overflow-hidden p-6 md:p-8">
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                                    <span className="w-2 h-8 bg-blue-500 rounded-full mr-4"></span>
                                    Purchase Items
                                </h2>
                                <div className="space-y-8">
                                    {purchaseItems.map((item) => (
                                        <div key={item.id} className="flex flex-col md:flex-row gap-6 border-b border-white/5 pb-8 last:border-0 last:pb-0">
                                            <div className="w-full md:w-32 aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No Image</div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-bold text-white line-clamp-2">{item.title}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-500 hover:text-red-400 transition-colors p-1"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="text-gray-400 text-sm mb-4">Product ID: {item.productId}</p>
                                                <div className="flex justify-between items-end">
                                                    <div className="flex items-center space-x-4">
                                                        <label className="text-xs text-gray-500 uppercase tracking-wider">Quantity</label>
                                                        <span className="text-white font-mono text-sm px-3 py-1 bg-white/5 border border-white/10 rounded">
                                                            1
                                                        </span>
                                                    </div>
                                                    <p className="text-xl font-mono font-medium text-white">{formatCartPrice(item.price * item.quantity)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Rental Items */}
                        {rentalItems.length > 0 && (
                            <div className="bg-glass-100 border border-white/10 rounded-2xl overflow-hidden p-6 md:p-8">
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                                    <span className="w-2 h-8 bg-purple-500 rounded-full mr-4"></span>
                                    Rental Items
                                    <span className="ml-4 text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30">
                                        Rental
                                    </span>
                                </h2>
                                <div className="space-y-8">
                                    {rentalItems.map((item) => (
                                        <div key={item.id} className="flex flex-col md:flex-row gap-6 border-b border-white/5 pb-8 last:border-0 last:pb-0">
                                            <div className="w-full md:w-32 aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 relative">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No Image</div>
                                                )}
                                                <div className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">RENTAL</div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-bold text-white line-clamp-2">{item.title}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-500 hover:text-red-400 transition-colors p-1"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="text-gray-400 text-sm mb-4">
                                                    Rental Period: <span className="text-purple-300">{item.rentalDays || 1} Days</span>
                                                </p>
                                                <div className="flex justify-between items-end">
                                                    <div className="flex items-center space-x-4">
                                                        <label className="text-xs text-gray-500 uppercase tracking-wider">Duration</label>
                                                        <div className="relative">
                                                            <select
                                                                value={item.rentalDays || 1}
                                                                onChange={(e) => updateRentalDays(item.id, parseInt(e.target.value))}
                                                                className="bg-white/5 border border-white/10 rounded px-3 py-1 text-white text-sm focus:outline-none focus:border-purple-500 pr-8"
                                                            >
                                                                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                                                                    <option key={day} value={day} className="bg-gray-900">
                                                                        {day} {day === 1 ? 'Day' : 'Days'}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-right text-purple-400/70 mb-1">
                                                            ¥{(item.price).toLocaleString()} / day
                                                        </p>
                                                        <p className="text-xl font-mono font-medium text-purple-300">
                                                            {formatCartPrice(item.price * (item.rentalDays || 1))}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-glass-200 border border-white/10 rounded-2xl p-6 md:p-8 sticky top-32">
                            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 pb-6 border-b border-white/10 text-sm">
                                <div className="flex justify-between text-gray-300">
                                    <span>Subtotal (Purchase)</span>
                                    <span className="font-mono">{formatCartPrice(purchaseTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>Subtotal (Rental)</span>
                                    <span className="font-mono">{formatCartPrice(rentalTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>Shipping</span>
                                    <span className="text-green-400">Free</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-8">
                                <span className="text-lg font-bold text-white">Total</span>
                                <span className="text-2xl font-mono font-bold text-white">{formatCartPrice(grandTotal)}</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                            >
                                {isCheckingOut ? (
                                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    'Proceed to Shipping'
                                )}
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                Secure checkout powered by Stripe
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
