import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  dbHost: string;
  dbUser: string;
  dbPassword: string;
  dbName: string;
  dbPort: number;
  stripeSecretKey: string;
  stripeWebhookSecret: string;
  paymentProvider: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbHost: process.env.DB_HOST || 'localhost',
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || 'secret',
  dbName: process.env.DB_NAME || 'payment_db',
  dbPort: Number(process.env.DB_PORT) || 3306,
  paymentProvider: process.env.PAYMENT_PROVIDER || 'stripe',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || 'secret-key',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'webhook-key',
};

export default config;
