import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../general/user/user.entity';

@Entity('route_template')
export class RouteTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  code: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'text' })
  repeat_type: string;

  @Column({ type: 'integer' })
  repeat_on: number;

  @Column({ type: 'integer', nullable: true })
  created_by: number;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'integer', nullable: true })
  updated_by: number;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'integer', nullable: true })
  deleted_by: number;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'integer', nullable: true })
  assignedEmployeeId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'assignedEmployeeId' })
  assignedEmployee: User;
}
