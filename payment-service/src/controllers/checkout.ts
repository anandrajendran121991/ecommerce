import { Request, Response } from 'express';
import stripe from '../config/stripe';

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const products = req.body.products;

    const lineItems = products.map((product: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(product.price * 100), // dollars to cents
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: 'anand.rajendran121991@gmail.com', // ✅ Add this
      line_items: lineItems,
      success_url: 'http://localhost:5173/products',
      cancel_url: 'http://localhost:3000/checkout/cancel',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
