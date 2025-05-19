// src/utils/Database.ts
import { AppDataSource } from '../data-source';

// Singleton Pattern - We need only one instance of a DB connection always
export class Database {
  private static instance = AppDataSource;

  private constructor() {}

  public static getInstance() {
    return Database.instance;
  }

  public static async initialize(): Promise<void> {
    try {
      if (!Database.instance.isInitialized) {
        await Database.instance.initialize();
        console.log('✅ Data Source has been initialized!');
      } else {
        console.log('⚠️ Data Source was already initialized.');
      }
    } catch (error) {
      console.error('❌ Failed to initialize Data Source:', error);
      process.exit(1);
    }
  }
}
