import Stripe from 'stripe';
import { AppDataSource } from '../data-source';
import { Order } from '../entities/Order';
import { User } from '../entities/User';

export const handleCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session,
) => {
  console.log('session', session);
  const email = session.customer_email;

  if (!email) {
    console.error('No email in checkout session');
    return;
  }

  const userRepo = AppDataSource.getRepository(User);
  const orderRepo = AppDataSource.getRepository(Order);

  const user = await userRepo.findOneBy({ email });

  if (!user) {
    console.warn(`User with email ${email} not found`);
    return;
  }

  const order = orderRepo.create({
    user,
    total: session.amount_total! / 100,
    paymentIntentId: session.payment_intent?.toString(),
    status: 'PAID',
  });

  await orderRepo.save(order);
  console.log(`✅ Order saved for user ${email}`);
};
