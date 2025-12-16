'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
    const { clearCart } = useCart();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        // 決済成功時にカートをクリア
        clearCart();
    }, [clearCart]);

    return (
        <div className="max-w-md w-full relative z-10 bg-glass-100 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-xl">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">Thank You!</h1>
            <p className="text-gray-300 mb-8">
                Your order has been placed successfully.
                <br />
                <span className="text-sm text-gray-500">Session ID: {sessionId?.slice(0, 10)}...</span>
            </p>

            <div className="space-y-4">
                <Link
                    href="/products"
                    className="block w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                    Continue Shopping
                </Link>
                <Link
                    href="/"
                    className="block w-full py-3 bg-white/5 text-white font-medium rounded-xl hover:bg-white/10 transition-colors border border-white/10"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none"></div>

            {/* Background Effects */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/20 rounded-full mix-blend-screen filter blur-[128px]"></div>
            </div>

            <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
