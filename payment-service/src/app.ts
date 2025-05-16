import express from 'express';
import productRoutes from './routes/products';
import checkoutRoutes from './routes/checkout';
import webhookRoutes from './routes/webhook';

const app = express();

// We need this before the json setup
app.use('/webhook', webhookRoutes); // raw body used here

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Payment service is ready to accept the requests');
});

app.use('/products', productRoutes);

app.use('/checkout', checkoutRoutes);

export default app;
