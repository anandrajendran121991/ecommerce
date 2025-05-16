import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Category } from './entities/Category';
import { Product } from './entities/Product';
import { Inventory } from './entities/Inventory';
import { User } from './entities/User';
import { Order } from './entities/Order';
import { Address } from './entities/Address';
import { OrderItem } from './entities/OrderItem';
import config from './config/config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  synchronize: false, // turn off in production
  logging: true,
  entities: [Category, Product, Inventory, User, Order, Address, OrderItem],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
