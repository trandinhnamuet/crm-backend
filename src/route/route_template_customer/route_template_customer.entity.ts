import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('route_template_customer')
export class RouteTemplateCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  route_template_id: number;

  @Column({ type: 'integer' })
  customer_id: number;
}
