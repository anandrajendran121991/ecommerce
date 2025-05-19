import { Request, Response } from 'express';
import { StripeService } from '../services/StripeService';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';
import { In } from 'typeorm';
import { PaymentContext } from '../services/PaymentContext';
import { PaymentProcessor } from '../interfaces/payment';

export class CheckoutController {
  private paymentContext: PaymentContext;

  // Behavioral Pattern - PaymentContext using stripeProcessor is a strategy pattern
  constructor(paymentProcessor: PaymentProcessor) {
    this.paymentContext = new PaymentContext(paymentProcessor);
  }

  createSession = async (req: Request, res: Response) => {
    try {
      const { products } = req.body;
      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'No products provided' });
      }

      const productRepo = AppDataSource.getRepository(Product);
      const productIds = products.map((p) => p.id);
      const dbProducts = await productRepo.findBy({
        id: In(productIds),
      });

      if (dbProducts.length !== products.length) {
        return res
          .status(400)
          .json({ error: 'One or more products not found' });
      }

      const session = await this.paymentContext.createCheckoutSession(
        products,
        'anand.rajendran121991@gmail.com',
      );

      if (!session?.url) {
        return res
          .status(500)
          .json({ error: 'Failed to create checkout session URL' });
      }

      return res.status(200).json({ url: session.url });
    } catch (error) {
      console.error('[Checkout Error]', error);
      return res
        .status(500)
        .json({ error: 'Failed to create checkout session' });
    }
  };
}
