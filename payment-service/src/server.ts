import app from './app';
import { AppDataSource } from './data-source';
import config from './config/config';

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Data Source has been initialized!');

    app.listen(config.port, '0.0.0.0', () => {
      console.log(`🚀 Server is running on http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to initialize Data Source:', error);
    process.exit(1); // Exit process if DB fails to connect
  });
