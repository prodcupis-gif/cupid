// Netlify Function: Create Stripe Checkout Session
// POST -> /.netlify/functions/stripe-checkout
// Body: { title: string, price: number, quantity?: number }

import Stripe from 'stripe';

export async function handler(event) {
    try {
        if (event.httpMethod !== 'POST') {
            return { statusCode: 405, body: 'Method Not Allowed' };
        }

        const { title, price, quantity = 1 } = JSON.parse(event.body || '{}');
        if (!title || !price) {
            return { statusCode: 400, body: 'Missing title or price' };
        }

        const secretKey = process.env.STRIPE_SECRET_KEY;
        const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
        const successUrl = process.env.SUCCESS_URL || `${process.env.URL || ''}/success.html`;
        const cancelUrl = process.env.CANCEL_URL || `${process.env.URL || ''}/cancel.html`;

        if (!secretKey) {
            return { statusCode: 500, body: 'Missing STRIPE_SECRET_KEY' };
        }

        const stripe = new Stripe(secretKey, { apiVersion: '2024-06-20' });

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: process.env.CURRENCY || 'usd',
                        product_data: { name: title },
                        unit_amount: Math.round(price * 100)
                    },
                    quantity
                }
            ],
            success_url: successUrl,
            cancel_url: cancelUrl
        });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: session.id, publishableKey })
        };
    } catch (err) {
        return { statusCode: 500, body: `Stripe error: ${err.message}` };
    }
}


