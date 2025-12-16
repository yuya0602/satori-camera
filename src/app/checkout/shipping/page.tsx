'use client';

import { useCart } from '@/contexts/CartContext';
import { calculatePurchaseTotal, calculateRentalTotal, formatCartPrice } from '@/lib/cart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ShippingPage() {
    const { cart } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
        postalCode: '',
        prefecture: '',
        city: '',
        addressLine1: '',
        building: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const purchaseTotal = calculatePurchaseTotal(cart);
    const rentalTotal = calculateRentalTotal(cart);
    const grandTotal = purchaseTotal + rentalTotal;

    useEffect(() => {
        // Redirect if cart is empty
        if (cart.items.length === 0) {
            router.push('/cart');
        }
    }, [cart, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
        if (!formData.prefecture) newErrors.prefecture = 'Prefecture is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.addressLine1) newErrors.addressLine1 = 'Street address is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Call the checkout API with shipping details
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: cart.items,
                    shippingDetails: formData
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Checkout failed:', data);
                alert(`Checkout failed: ${data.error || 'Please try again.'}`);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('An error occurred. Please try again.');
            setIsSubmitting(false);
        }
    };

    if (cart.items.length === 0) {
        return null; // or a loading spinner while redirecting
    }

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 relative">
            <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none"></div>

            {/* Background Effects */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full mix-blend-screen filter blur-[128px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full mix-blend-screen filter blur-[128px]"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-8">
                    <Link href="/cart" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm mb-4">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Cart
                    </Link>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Shipping Information</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-8">
                        <div className="bg-glass-100 border border-white/10 rounded-2xl p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* Contact Info */}
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2">Contact Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="lastName" className="block text-xs uppercase text-gray-500 tracking-wider">Last Name</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className={`w-full bg-white/5 border ${errors.lastName ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                                                placeholder="Yamada"
                                            />
                                            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="firstName" className="block text-xs uppercase text-gray-500 tracking-wider">First Name</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className={`w-full bg-white/5 border ${errors.firstName ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                                                placeholder="Taro"
                                            />
                                            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label htmlFor="email" className="block text-xs uppercase text-gray-500 tracking-wider">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                                                placeholder="taro.yamada@example.com"
                                            />
                                            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label htmlFor="phone" className="block text-xs uppercase text-gray-500 tracking-wider">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                                                placeholder="090-1234-5678"
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2">Shipping Address</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="postalCode" className="block text-xs uppercase text-gray-500 tracking-wider">Postal Code</label>
                                            <input
                                                type="text"
                                                id="postalCode"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleChange}
                                                className={`w-full bg-white/5 border ${errors.postalCode ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                                                placeholder="100-0001"
                                            />
                                            {errors.postalCode && <p className="text-red-500 text-xs">{errors.postalCode}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="prefecture" className="block text-xs uppercase text-gray-500 tracking-wider">Prefecture</label>
                                            <select
                                                id="prefecture"
                                                name="prefecture"
                                                value={formData.prefecture}
                                                onChange={handleChange}
                                                className={`w-full bg-white/5 border ${errors.prefecture ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none`}
                                            >
                                                <option value="" className="bg-gray-900 text-gray-400">Select Prefecture</option>
                                                <option value="Tokyo" className="bg-gray-900">Tokyo</option>
                                                <option value="Osaka" className="bg-gray-900">Osaka</option>
                                                <option value="Kanagawa" className="bg-gray-900">Kanagawa</option>
                                                <option value="Aichi" className="bg-gray-900">Aichi</option>
                                                <option value="Saitama" className="bg-gray-900">Saitama</option>
                                                <option value="Chiba" className="bg-gray-900">Chiba</option>
                                                <option value="Hokkaido" className="bg-gray-900">Hokkaido</option>
                                                <option value="Fukuoka" className="bg-gray-900">Fukuoka</option>
                                                {/* Add other prefectures as needed or use a full list */}
                                                <option value="Other" className="bg-gray-900">Other</option>
                                            </select>
                                            {errors.prefecture && <p className="text-red-500 text-xs">{errors.prefecture}</p>}
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label htmlFor="city" className="block text-xs uppercase text-gray-500 tracking-wider">City</label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className={`w-full bg-white/5 border ${errors.city ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                                                placeholder="Chiyoda-ku"
                                            />
                                            {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label htmlFor="addressLine1" className="block text-xs uppercase text-gray-500 tracking-wider">Street Address</label>
                                            <input
                                                type="text"
                                                id="addressLine1"
                                                name="addressLine1"
                                                value={formData.addressLine1}
                                                onChange={handleChange}
                                                className={`w-full bg-white/5 border ${errors.addressLine1 ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                                                placeholder="1-1 Chiyoda"
                                            />
                                            {errors.addressLine1 && <p className="text-red-500 text-xs">{errors.addressLine1}</p>}
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label htmlFor="building" className="block text-xs uppercase text-gray-500 tracking-wider">Building Name (Optional)</label>
                                            <input
                                                type="text"
                                                id="building"
                                                name="building"
                                                value={formData.building}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                                placeholder="Imperial Palace Apt 101"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-glass-200 border border-white/10 rounded-2xl p-6 md:p-8 sticky top-32">
                            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 pb-6 border-b border-white/10 text-sm">
                                <div className="flex justify-between text-gray-300">
                                    <span>Items ({cart.items.length})</span>
                                    <span>See Cart</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>Subtotal</span>
                                    <span className="font-mono">{formatCartPrice(grandTotal)}</span>
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
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                            >
                                {isSubmitting ? (
                                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    'Proceed to Payment'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
