import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { RouteInstance } from '../route_instance/route_instance.entity';

@Entity('route_instance_customer')
export class RouteInstanceCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  route_instance_id: number;

  @ManyToOne(() => RouteInstance)
  @JoinColumn({ name: 'route_instance_id' })
  route_instance: RouteInstance;

  @Column({ type: 'integer' })
  customer_id: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ type: 'boolean', default: false })
  is_visited: boolean;

  @Column({ type: 'timestamp', nullable: true })
  checkin_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  checkout_at: Date;

  @Column({ type: 'text', nullable: true })
  note: string;
}
