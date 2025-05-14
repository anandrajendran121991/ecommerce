// --- Entity: Order ---
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @Column()
  status!: string;

  @ManyToMany(() => Product)
  @JoinTable()
  products!: Product[];
}