// --- Entity: Product ---
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "./Category";
import { Inventory } from "./Inventory";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("text")
  description!: string;

  @Column("decimal")
  price!: number;

  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;

  @OneToOne(() => Inventory, (inventory) => inventory.product)
  inventory!: Inventory;
}