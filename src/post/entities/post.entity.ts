import { User } from 'src/user/entities';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', length: 400 })
  modelo: string;

  @Column({ type: 'int' })
  precio: number;

  @Column({ type: 'int' })
  telefono: number;

  @Column({ type: 'bool' })
  status: boolean;

  @Column({ type: 'varchar', length: 500 })
  urgencia: string;

  @Column({ type: 'varchar', length: 500 })
  trabajador: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  @JoinColumn({ name: 'author' })
  author: User;
}
