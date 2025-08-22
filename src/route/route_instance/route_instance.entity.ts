import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RouteTemplate } from '../route_template/route_template.entity';
import { User } from '../../general/user/user.entity';

@Entity('route_instance')
export class RouteInstance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  route_template_id: number;

  @ManyToOne(() => RouteTemplate)
  @JoinColumn({ name: 'route_template_id' })
  route_template: RouteTemplate;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date | null;

  @Column({ type: 'boolean', default: false })
  is_finished: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'integer', nullable: true })
  assignedEmployeeId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'assignedEmployeeId' })
  assignedEmployee: User;
}
