import { Controller, Get, Post, Put, Delete, Param, Body, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from './image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteInstanceCustomerImage } from '../../route/route_instance_customer_image/route_instance_customer_image.entity';

@Controller('images')
export class ImageController {
	constructor(
		private readonly service: ImageService,
		@InjectRepository(RouteInstanceCustomerImage)
		private readonly ricImageRepo: Repository<RouteInstanceCustomerImage>,
	) { }

	@Get('link/:id')
	async getImage(@Param('id') id: number, @Res() res: any) {
		console.log
		const image = await this.service.findOne(Number(id));
		if (!image) return res.status(404).send('Not found');
		res.setHeader('Content-Type', image.mime_type);
		res.send(image.image_data);
	}

	@Get('link/route_instance_customer/:route_instance_customer_id')
	async getImagesByRouteInstanceCustomer(@Param('route_instance_customer_id') routeInstanceCustomerId: number) {
		// Lấy các bản ghi liên kết
		const ricImages = await this.ricImageRepo.find({
			where: { route_instance_customer_id: Number(routeInstanceCustomerId) }
		});
		
		// Trả về list link ảnh
		const host = process.env.HOST;
		return ricImages.map(ricImage => ({
			id: ricImage.id,
			image_id: ricImage.image,
			link: `${host}/images/link/${ricImage.image}`,
			route_instance_customer_image_id: ricImage.id
		}));
	}

	@Get()
	findAll(): Promise<Image[]> {
		return this.service.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: number): Promise<Image | null> {
		return this.service.findOne(Number(id));
	}

	@Post()
	create(@Body() data: Partial<Image>): Promise<Image> {
		return this.service.create(data);
	}

	@Put(':id')
	update(@Param('id') id: number, @Body() data: Partial<Image>): Promise<Image | null> {
		return this.service.update(Number(id), data);
	}

	@Delete(':id')
	remove(@Param('id') id: number): Promise<void> {
		return this.service.remove(Number(id));
	}
}
