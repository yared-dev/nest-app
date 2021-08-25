import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/user/entities';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @ManyToOne(() => User, (user) => user.producto, { eager: true })
  @JoinColumn({ name: 'author' })
  author: User;
}
