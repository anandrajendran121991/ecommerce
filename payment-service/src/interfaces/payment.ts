import { Request } from 'express';

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export interface PaymentProcessor {
  createCheckoutSession(
    cartItems: CartItem[],
    customerEmail: string,
  ): Promise<any>;

  handleWebhook(req: Request): Promise<{ statusCode: number; body: any }>;
}
