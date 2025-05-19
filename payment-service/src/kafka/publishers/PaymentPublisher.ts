import { kafkaProducer } from '../Producer';

interface PaymentSuccessPayload {
  sessionId: string | number;
  customerEmail: string | null;
  amountTotal: number;
  paymentStatus: string;
  paymentIntentId: string;
  createdAt: string;
}

export const publishPaymentSuccess = async (data: PaymentSuccessPayload) => {
  try {
    await kafkaProducer.send({
      topic: 'payment.success',
      messages: [
        {
          key: data.sessionId.toString(),
          value: JSON.stringify(data),
        },
      ],
    });

    console.log('✅ Published payment.success to Kafka:', data);
  } catch (error) {
    console.error('❌ Failed to publish payment.success to Kafka:', error);
  }
};
