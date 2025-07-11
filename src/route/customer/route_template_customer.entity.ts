import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { RouteTemplate } from '../route_template/route_template.entity';

@Entity('route_template_customer')
export class RouteTemplateCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  route_template_id: number;

  @Column()
  customer_id: number;

  @ManyToOne(() => RouteTemplate)
  @JoinColumn({ name: 'route_template_id' })
  routeTemplate: RouteTemplate;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
