import { AppDataSource } from '../data-source';
import { Order } from '../entities/Order';
import { User } from '../entities/User';

interface PaymentSuccessPayload {
  sessionId: string;
  customerEmail: string;
  amountTotal: number;
  paymentStatus: string;
  paymentIntentId: string;
  createdAt: string;
}

async function createOrderFromPayment(
  payment: PaymentSuccessPayload,
): Promise<void> {
  const userRepository = AppDataSource.getRepository(User);
  const orderRepository = AppDataSource.getRepository(Order);

  try {
    if (!payment.customerEmail) {
      throw new Error('Missing customer email in payment payload');
    }

    const user = await userRepository.findOne({
      where: { email: payment.customerEmail },
    });

    if (!user) {
      throw new Error(`User not found for email: ${payment.customerEmail}`);
    }

    const order = orderRepository.create({
      status: payment.paymentStatus,
      paymentIntentId: payment.paymentIntentId,
      total: payment.amountTotal,
      user,
    });

    await orderRepository.save(order);

    console.log('✅ Order created from payment');
  } catch (error) {
    console.error('❌ Failed to create order from payment:', error);
  }
}

// 👇 Export them together
export const orderService = {
  createOrderFromPayment,
};
