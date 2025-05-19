import { Request, Response } from 'express';
import { PaymentProcessor } from '../interfaces/payment';

export class WebhookController {
  constructor(private paymentProcessor: PaymentProcessor) {}

  handleWebhook = async (req: Request, res: Response) => {
    const result = await this.paymentProcessor.handleWebhook(req);
    res.status(result.statusCode).send(result.body);
  };
}
