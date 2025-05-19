import kafka from '../Kafka';
import { orderService } from '../../services/OrderService';

export const startPaymentSuccessConsumer = async () => {
  const consumer = kafka.consumer({ groupId: 'order-service' });

  await consumer.connect();
  await consumer.subscribe({
    topic: 'payment.success',
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const value = message.value?.toString();
        if (!value) return;

        const parsedPayload = JSON.parse(value);
        console.log('✅ Received payment.success event:', parsedPayload);

        await orderService.createOrderFromPayment(parsedPayload);
      } catch (err) {
        console.error('❌ Error in payment.success consumer:', err);
      }
    },
  });
};
