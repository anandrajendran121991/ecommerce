import { startPaymentSuccessConsumer } from './consumers/PaymentConsumer';

export const startAllConsumers = async () => {
  await startPaymentSuccessConsumer();
  // Add other consumers here if needed
};
