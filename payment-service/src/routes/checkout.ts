import { Router, Request, Response } from 'express';
import { createCheckoutSession } from '../controllers/checkout';

const router: Router = Router();
// GET /create-checkout-session
router.get('/create-checkout-session', createCheckoutSession);

// 👇 Success handler
router.get('/success', (req: Request, res: Response) => {
  res.send('✅ Payment successful! Thank you for your order.');
});

// 👇 Cancel handler
router.get('/cancel', (req: Request, res: Response) => {
  res.send('❌ Payment cancelled. You can try again anytime.');
});

export default router;
