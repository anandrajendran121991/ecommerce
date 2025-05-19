import Stripe from 'stripe';
import { AppDataSource } from '../data-source';
import config from '../config/config';
import { Order } from '../entities/Order';
import { User } from '../entities/User';
import { CartItem, PaymentProcessor } from '../interfaces/payment';
import { Request } from 'express';

// ✅ Initialize Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

export class StripeService implements PaymentProcessor {
  async createCheckoutSession(
    cartItems: CartItem[],
    customerEmail: string,
  ): Promise<any> {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cartItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail,
      line_items: lineItems,
      success_url: 'http://localhost:5173/products?success=true',
      cancel_url: 'http://localhost:5173/products?canceled=true',
    });

    return session;
  }

  async handleWebhook(
    req: Request,
  ): Promise<{ statusCode: number; body: any }> {
    const sig = req.headers['stripe-signature'] as string;
    const rawBody = req.body as Buffer;

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        config.stripeWebhookSecret,
      );

      // Process event
      switch (event.type) {
        case 'checkout.session.completed':
          await this.handleCheckoutSessionCompleted(
            event.data.object as Stripe.Checkout.Session,
          );
          break;
        default:
          console.log(`⚠️ Unhandled event type: ${event.type}`);
      }

      return { statusCode: 200, body: { received: true } };
    } catch (err: any) {
      console.error('❌ Invalid Stripe webhook signature:', err.message);
      return { statusCode: 400, body: `Webhook Error: ${err.message}` };
    }
  }

  private async handleCheckoutSessionCompleted(
    session: Stripe.Checkout.Session,
  ): Promise<void> {
    const email = session.customer_email;
    if (!email) return;

    const userRepo = AppDataSource.getRepository(User);
    const orderRepo = AppDataSource.getRepository(Order);
    const user = await userRepo.findOneBy({ email });

    if (!user) return;

    const order = orderRepo.create({
      user,
      total: (session.amount_total ?? 0) / 100,
      paymentIntentId: session.payment_intent?.toString() ?? '',
      status: 'PAID',
    });

    await orderRepo.save(order);
  }
}
