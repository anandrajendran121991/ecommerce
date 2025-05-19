// src/index.ts
import app from './app';
import config from './config/config';
import { Database } from './services/Database';

async function startServer() {
  await Database.initialize();

  app.listen(config.port, '0.0.0.0', () => {
    console.log(`🚀 Server is running on http://localhost:${config.port}`);
  });
}

startServer();
