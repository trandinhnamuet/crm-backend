import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'route_instance_customer_image' })
export class RouteInstanceCustomerImage {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'int' })
	route_instance_customer_id: number;

	@Column({ type: 'int' })
	image: number;
}
