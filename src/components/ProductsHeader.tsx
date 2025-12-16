'use strict';
'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CartIcon from './CartIcon';

export default function ProductsHeader() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Sync state with URL params
    useEffect(() => {
        const q = searchParams.get('q');
        if (q) {
            setSearchQuery(q);
            setIsSearchOpen(true);
        }
    }, [searchParams]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push('/products');
        }
    };

    const toggleSearch = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <nav className="fixed w-full z-40 top-0 p-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center bg-glass-200 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4 shadow-lg transition-all duration-300">
                <Link href="/" className="text-2xl font-bold tracking-widest text-white flex items-center group">
                    <span className="group-hover:text-gray-300 transition-colors">SATORI</span>
                </Link>

                <div className="flex items-center">
                    <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64 opacity-100 mr-4' : 'w-0 opacity-0 overflow-hidden'}`}>
                        <form onSubmit={handleSearchSubmit} className="w-full relative">
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full bg-white/10 border border-white/20 rounded-full py-1 px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-colors"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery('');
                                        router.push('/products');
                                        searchInputRef.current?.focus();
                                    }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            )}
                        </form>
                    </div>

                    <div className="flex space-x-8 text-sm tracking-widest uppercase text-gray-300 items-center">
                        <a href="#" onClick={toggleSearch} className={`hover:text-white transition-colors ${isSearchOpen ? 'text-white' : ''}`}>Search</a>
                        <CartIcon />
                    </div>
                </div>
            </div>
        </nav>
    );
}
