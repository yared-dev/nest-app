import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Employe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  dni: number;

  @Column({ type: 'int' })
  sueldo: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
  // @CreateDateColumn({ name: 'sgtPago', type: 'timestamp' })
  // sgtPago: Date;

  // @Column({ type: 'int' })
  // pagoMensual: number;

  // @CreateDateColumn({ name: 'fechaPrimerPago', type: 'timestamp' })
  // fechaPrimerPago: Date;

  // @Column({ type: 'int' })
  // defaultPago: number;
}
