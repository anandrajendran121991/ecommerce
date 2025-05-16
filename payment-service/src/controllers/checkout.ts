import { Request, Response } from 'express';
import stripe from '../config/stripe';

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    // 🔧 Hardcoded product list
    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Test T-Shirt',
          },
          unit_amount: 2000, // $20.00
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Test Hoodie',
          },
          unit_amount: 4500, // $45.00
        },
        quantity: 2,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: 'anand.rajendran121991@gmail.com', // ✅ Add this
      line_items: lineItems,
      success_url: 'http://localhost:3000/checkout/success',
      cancel_url: 'http://localhost:3000/checkout/cancel',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
