import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Articulo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'int' })
  precio: number;
}
