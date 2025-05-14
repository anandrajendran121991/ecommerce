import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "./entities/Category";
import { Product } from "./entities/Product";
import { Inventory } from "./entities/Inventory";
import { User } from "./entities/User";
import { Order } from "./entities/Order";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "ecommerce",
  synchronize: true, // turn off in production
  logging: false,
  entities: [Category, Product, Inventory, User, Order],
  migrations: [],
  subscribers: [],
});