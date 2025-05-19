import { CheckoutController } from './controllers/CheckoutController';
import { WebhookController } from './controllers/WebhookController';
import { PaymentFactory } from './services/PaymentFactory';

// Creational pattern - PaymentFactory is a Factory pattern
const paymentProcessor = PaymentFactory.getProcessor();
export const checkoutController = new CheckoutController(paymentProcessor);
export const webhookController = new WebhookController(paymentProcessor);
