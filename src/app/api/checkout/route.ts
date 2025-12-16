import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItem } from '@/lib/cart';

// Stripe初期化
// 環境変数が設定されていない場合でもビルドは通るようにするが、実行時にエラーになる
const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-11-17.clover',
    })
    : null;

export async function POST(request: Request) {
    if (!stripe) {
        console.error('Stripe is not initialized. STRIPE_SECRET_KEY might be missing.');
        return NextResponse.json(
            { error: 'Stripe API key is not configured' },
            { status: 500 }
        );
    }

    try {
        const { items, shippingDetails } = await request.json();

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: 'No items provided' },
                { status: 400 }
            );
        }

        // StripeのLine Itemsを作成
        const lineItems = items.map((item: CartItem) => {
            // 商品名を作成（レンタルの場合は明記）
            let name = item.title;
            let description = undefined;

            if (item.type === 'rental') {
                name = `[RENTAL] ${item.title}`;
                description = `Rental Period: ${item.rentalDays || 1} Night(s)`;
                // レンタル日数が2日以上の場合、価格計算が必要だが、
                // cart.tsの仕様では1泊2日が基本単位となっているため、
                // ここでは単価 × 数量 でStripeに渡す。
                // もし日数による価格変動があるならここで調整する。
            }

            return {
                price_data: {
                    currency: 'jpy',
                    product_data: {
                        name: name,
                        description: description,
                        images: item.image ? [item.image] : [],
                    },
                    unit_amount: item.price, // 日本円は整数
                },
                quantity: item.quantity,
            };
        });

        // チェックアウトセッション作成
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: shippingDetails?.email,
            line_items: lineItems,
            mode: 'payment', // レンタルも一時払いなのでpaymentモード
            payment_intent_data: shippingDetails ? {
                shipping: {
                    name: `${shippingDetails.lastName} ${shippingDetails.firstName}`,
                    address: {
                        line1: shippingDetails.addressLine1,
                        line2: shippingDetails.building || '',
                        city: shippingDetails.city,
                        state: shippingDetails.prefecture,
                        postal_code: shippingDetails.postalCode,
                        country: 'JP',
                    },
                    phone: shippingDetails.phone,
                },
            } : undefined,
            success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/cart`,
            metadata: {
                // 必要に応じてメタデータを追加
                order_type: items.some((i: CartItem) => i.type === 'rental') ? 'mixed' : 'purchase',
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
