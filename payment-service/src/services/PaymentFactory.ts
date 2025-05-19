import { PaymentProcessor } from '../interfaces/payment';
import { StripeService } from './StripeService';

/**
 * This is a classic example of a factory pattern
 */
export class PaymentFactory {
  static getProcessor(): PaymentProcessor {
    const provider = process.env.PAYMENT_PROVIDER?.toLowerCase();
    switch (provider) {
      case 'stripe':
        return new StripeService();
      default:
        throw new Error(`Unsupported payment provider: ${provider}`);
    }
  }
}
