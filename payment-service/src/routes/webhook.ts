import express from 'express';
import { handleStripeWebhook } from '../controllers/webhook';

const router = express.Router();

// Stripe needs raw body to validate signature
router.post(
  '/',
  express.raw({ type: 'application/json' }),
  handleStripeWebhook,
);

export default router;
