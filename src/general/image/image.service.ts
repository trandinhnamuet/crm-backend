import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';

@Injectable()
export class ImageService {
	constructor(
		@InjectRepository(Image)
		private readonly repo: Repository<Image>,
	) {}

	async findAll(): Promise<Image[]> {
		return this.repo.find();
	}

	async findOne(id: number): Promise<Image | null> {
		return this.repo.findOneBy({ id });
	}

	async create(data: Partial<Image>): Promise<Image> {
		const entity = this.repo.create(data);
		return this.repo.save(entity);
	}

	async update(id: number, data: Partial<Image>): Promise<Image | null> {
		await this.repo.update(id, data);
		return this.findOne(id);
	}

	async remove(id: number): Promise<void> {
		await this.repo.delete(id);
	}
}
