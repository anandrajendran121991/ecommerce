import express from 'express';

const app = express();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Payment service is ready to accept the requests');
});

export default app;