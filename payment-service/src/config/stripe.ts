import Stripe from 'stripe';
import config from './config'; // contains your stripe secret key

const stripe = new Stripe(config.stripeSecretKey, {
  apiVersion: '2022-11-15',
});

export default stripe;
