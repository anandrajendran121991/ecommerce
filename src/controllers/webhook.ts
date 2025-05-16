import { Request, Response, NextFunction } from 'express';
import stripe from '../config/stripe';
import config from '../config/config';
import { handleCheckoutSessionCompleted } from '../services/stripe';
import type Stripe from 'stripe';

// No type override in the parameter
export const handleStripeWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    // Use type assertion only where needed
    event = stripe.webhooks.constructEvent(
      req.body as Buffer,
      sig,
      config.stripeWebhookSecret,
    );
  } catch (err: any) {
    console.error('❌ Invalid Stripe webhook signature:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(
        event.data.object as Stripe.Checkout.Session,
      );
      break;
    default:
      console.log(`⚠️ Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
};
