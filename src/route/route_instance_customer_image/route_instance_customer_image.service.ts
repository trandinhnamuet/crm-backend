import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteInstanceCustomerImage } from './route_instance_customer_image.entity';

@Injectable()
export class RouteInstanceCustomerImageService {
	constructor(
		@InjectRepository(RouteInstanceCustomerImage)
		private readonly repo: Repository<RouteInstanceCustomerImage>,
	) {}

	async findAll(): Promise<RouteInstanceCustomerImage[]> {
		return this.repo.find();
	}

		async findOne(id: number): Promise<RouteInstanceCustomerImage | null> {
			return this.repo.findOneBy({ id });
		}

	async create(data: Partial<RouteInstanceCustomerImage>): Promise<RouteInstanceCustomerImage> {
		const entity = this.repo.create(data);
		return this.repo.save(entity);
	}

	async update(id: number, data: Partial<RouteInstanceCustomerImage>): Promise<RouteInstanceCustomerImage> {
		await this.repo.update(id, data);
		return this.findOne(id) as Promise<RouteInstanceCustomerImage>;
	}

	async remove(id: number): Promise<void> {
		await this.repo.delete(id);
	}
}
