// カートアイテムの型定義

export type CartItemType = 'purchase' | 'rental';

export interface CartItem {
    id: string; // 一意のカートアイテムID
    productId: string;
    title: string;
    price: number; // 購入価格またはレンタル価格
    type: CartItemType;
    quantity: number;
    image?: string;
    // レンタル用フィールド
    rentalStartDate?: string; // ISO形式の日付
    rentalEndDate?: string;
    rentalDays?: number; // 泊数
}

export interface Cart {
    items: CartItem[];
    updatedAt: string;
}

/**
 * カート内の購入アイテムのみを取得
 */
export function getPurchaseItems(cart: Cart): CartItem[] {
    return cart.items.filter(item => item.type === 'purchase');
}

/**
 * カート内のレンタルアイテムのみを取得
 */
export function getRentalItems(cart: Cart): CartItem[] {
    return cart.items.filter(item => item.type === 'rental');
}

/**
 * 購入アイテムの合計金額を計算
 */
export function calculatePurchaseTotal(cart: Cart): number {
    return getPurchaseItems(cart).reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

/**
 * レンタルアイテムの合計金額を計算
 */
export function calculateRentalTotal(cart: Cart): number {
    return getRentalItems(cart).reduce((total, item) => {
        // レンタル日数に応じて価格を計算（1泊2日が基本）
        const days = item.rentalDays || 1;
        return total + (item.price * days * item.quantity);
    }, 0);
}

/**
 * カート全体の合計金額を計算
 */
export function calculateCartTotal(cart: Cart): number {
    return calculatePurchaseTotal(cart) + calculateRentalTotal(cart);
}

/**
 * カート内のアイテム数を取得
 */
export function getCartItemCount(cart: Cart): number {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
}

/**
 * 空のカートを作成
 */
export function createEmptyCart(): Cart {
    return {
        items: [],
        updatedAt: new Date().toISOString(),
    };
}

/**
 * 価格をフォーマット（円表示）
 */
export function formatCartPrice(price: number): string {
    return `¥${price.toLocaleString()}`;
}
