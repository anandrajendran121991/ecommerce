import { PaymentProcessor, CartItem } from '../interfaces/payment';
import { Request } from 'express';

export class PaymentContext {
  constructor(private processor: PaymentProcessor) {}

  async createCheckoutSession(cartItems: CartItem[], customerEmail: string) {
    return this.processor.createCheckoutSession(cartItems, customerEmail);
  }

  async handleWebhook(
    req: Request,
  ): Promise<{ statusCode: number; body: any }> {
    return this.processor.handleWebhook(req);
  }
}
