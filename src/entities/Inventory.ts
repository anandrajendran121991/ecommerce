// --- Entity: Inventory ---
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './Product';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantity!: number;

  @OneToOne(() => Product)
  @JoinColumn()
  product!: Product;
}
