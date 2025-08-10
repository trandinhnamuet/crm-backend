import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RouteTemplate } from '../route_template/route_template.entity';
import { Customer } from '../customer/customer.entity';

@Entity('route_template_customer')
export class RouteTemplateCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  route_template_id: number;

  @Column({ type: 'integer' })
  customer_id: number;

  @ManyToOne(() => RouteTemplate)
  @JoinColumn({ name: 'route_template_id' })
  routeTemplate: RouteTemplate;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
