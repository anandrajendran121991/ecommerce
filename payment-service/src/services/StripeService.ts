import Stripe from 'stripe';
import config from '../config/config';
import { CartItem, PaymentProcessor } from '../interfaces/payment';
import { Request } from 'express';
import { publishPaymentSuccess } from '../kafka/publishers/PaymentPublisher';

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
    const orderData = {
      sessionId: session.id,
      customerEmail: session.customer_email,
      amountTotal: (session.amount_total ?? 0) / 100,
      paymentStatus: 'PAID',
      paymentIntentId: session.payment_intent?.toString() ?? '',
      createdAt: new Date().toISOString(),
    };

    await publishPaymentSuccess(orderData);
  }
}
