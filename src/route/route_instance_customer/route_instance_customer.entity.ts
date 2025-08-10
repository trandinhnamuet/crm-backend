import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('route_instance_customer')
export class RouteInstanceCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  route_instance_id: number;

  @Column({ type: 'integer' })
  customer_id: number;

  @Column({ type: 'boolean', default: false })
  is_visited: boolean;

  @Column({ type: 'timestamp', nullable: true })
  checkin_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  checkout_at: Date;

  @Column({ type: 'text', nullable: true })
  note: string;
}
