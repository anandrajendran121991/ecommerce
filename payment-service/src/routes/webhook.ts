import express from 'express';
import { webhookController } from '../container';

const router = express.Router();

// Stripe needs raw body to validate signature
router.post(
  '/',
  express.raw({ type: 'application/json' }),
  webhookController.handleWebhook,
);

export default router;
