import express from 'express';
import { AppDataSource } from './data-source';
import productRoutes from './routes/products';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Payment service is ready to accept the requests');
});

app.use('/products', productRoutes);

export default app;
