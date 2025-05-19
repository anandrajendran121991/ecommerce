import { Router, Request, Response } from 'express';
import { checkoutController } from '../container';

const router: Router = Router();

// POST /create-checkout-session
router.post('/', checkoutController.createSession);

// 👇 Success handler
router.get('/success', (req: Request, res: Response) => {
  res.send('✅ Payment successful! Thank you for your order.');
});

// 👇 Cancel handler
router.get('/cancel', (req: Request, res: Response) => {
  res.send('❌ Payment cancelled. You can try again anytime.');
});

export default router;
