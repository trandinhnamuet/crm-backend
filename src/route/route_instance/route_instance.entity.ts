import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('route_instance')
export class RouteInstance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  route_template_id: number;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date | null;

  @Column({ type: 'boolean', default: false })
  is_finished: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
