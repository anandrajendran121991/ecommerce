// src/index.ts
import app from './app';
import config from './config/config';
import { startAllConsumers } from './kafka/consumer';
import { Database } from './services/Database';
import { startProducer } from './kafka/Producer';

async function startServer() {
  await Database.initialize();

  // Start the Kafka producer
  await startProducer();
  console.log('Kafka producer started successfully.');

  // Start the Kafka consumer
  await startAllConsumers();
  console.log('Kafka consumer started successfully.');

  app.listen(config.port, '0.0.0.0', () => {
    console.log(`🚀 Server is running on http://localhost:${config.port}`);
  });
}

startServer();
