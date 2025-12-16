'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Cart, CartItem, CartItemType, createEmptyCart, getCartItemCount, calculateCartTotal } from '@/lib/cart';

const CART_STORAGE_KEY = 'satori-cart';

interface CartContextType {
    cart: Cart;
    addToCart: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    updateRentalDays: (itemId: string, days: number) => void;
    clearCart: () => void;
    itemCount: number;
    total: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * カートの状態をLocalStorageから読み込む
 */
function loadCartFromStorage(): Cart {
    if (typeof window === 'undefined') {
        return createEmptyCart();
    }

    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Failed to load cart from storage:', error);
    }

    return createEmptyCart();
}

/**
 * カートの状態をLocalStorageに保存
 */
function saveCartToStorage(cart: Cart): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error('Failed to save cart to storage:', error);
    }
}

/**
 * 一意のカートアイテムIDを生成
 */
function generateItemId(productId: string, type: CartItemType): string {
    return `${productId}-${type}-${Date.now()}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart>(createEmptyCart());
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // 初回マウント時にLocalStorageから読み込む
    useEffect(() => {
        const loadedCart = loadCartFromStorage();
        setCart(loadedCart);
        setIsInitialized(true);
    }, []);

    // カートが変更されたらLocalStorageに保存
    useEffect(() => {
        if (isInitialized) {
            saveCartToStorage(cart);
        }
    }, [cart, isInitialized]);

    // カートにアイテムを追加
    const addToCart = useCallback((item: Omit<CartItem, 'id' | 'quantity'>, quantity: number = 1) => {
        setCart(prevCart => {
            // 同じ商品・同じタイプがすでにカートにあるかチェック
            const existingItemIndex = prevCart.items.findIndex(
                i => i.productId === item.productId && i.type === item.type
            );

            let newItems: CartItem[];

            if (existingItemIndex >= 0) {
                // 既存アイテムの場合
                newItems = prevCart.items.map((i, index) => {
                    if (index === existingItemIndex) {
                        // 数量は1に固定（増やさない）
                        //レンタルの場合は日数を更新
                        if (item.type === 'rental' && item.rentalDays) {
                            return { ...i, rentalDays: item.rentalDays };
                        }
                        return i;
                    }
                    return i;
                });
            } else {
                // 新しいアイテムを追加
                const newItem: CartItem = {
                    ...item,
                    id: generateItemId(item.productId, item.type),
                    quantity: 1, // 常に1
                };
                newItems = [...prevCart.items, newItem];
            }

            return {
                items: newItems,
                updatedAt: new Date().toISOString(),
            };
        });
    }, []);

    // カートからアイテムを削除
    const removeFromCart = useCallback((itemId: string) => {
        setCart(prevCart => ({
            items: prevCart.items.filter(item => item.id !== itemId),
            updatedAt: new Date().toISOString(),
        }));
    }, []);

    // アイテムの数量を更新
    const updateQuantity = useCallback((itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        // 数量は常に1（変更不可にするため、ここでは更新しないか、1に強制する）
        // ただし、一応functionとしては残すが、呼び出し側で制御する方針
        // もしくはここで強制的に1にする？
        // User request: "quantity is 1 only". So force 1.

        const safeQuantity = 1;

        setCart(prevCart => ({
            items: prevCart.items.map(item => {
                if (item.id === itemId) {
                    return { ...item, quantity: safeQuantity };
                }
                return item;
            }),
            updatedAt: new Date().toISOString(),
        }));
    }, [removeFromCart]);

    // レンタル日数を更新
    const updateRentalDays = useCallback((itemId: string, days: number) => {
        if (days < 1) return;

        setCart(prevCart => ({
            items: prevCart.items.map(item => {
                if (item.id === itemId && item.type === 'rental') {
                    return { ...item, rentalDays: days };
                }
                return item;
            }),
            updatedAt: new Date().toISOString(),
        }));
    }, []);

    // カートをクリア
    const clearCart = useCallback(() => {
        setCart(createEmptyCart());
    }, []);

    const value: CartContextType = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateRentalDays,
        clearCart,
        itemCount: getCartItemCount(cart),
        total: calculateCartTotal(cart),
        isCartOpen,
        setIsCartOpen,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextType {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
