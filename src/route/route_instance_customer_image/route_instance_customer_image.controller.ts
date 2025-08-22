import { Controller, Get, Post, Put, Delete, Param, Body, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import type { File as MulterFile } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../../general/image/image.entity';
import { RouteInstanceCustomerImageService } from './route_instance_customer_image.service';
import { RouteInstanceCustomerImage } from './route_instance_customer_image.entity';

@Controller('route-instance-customer-images')
export class RouteInstanceCustomerImageController {
    constructor(
        private readonly service: RouteInstanceCustomerImageService,
        @InjectRepository(Image)
        private readonly imageRepo: Repository<Image>,
    ) { }

    /**
* Lấy danh sách ảnh theo route_instance_customer_id
*/
    @Get('by-route-instance-customer/:route_instance_customer_id')
    async getImagesByRouteInstanceCustomer(@Param('route_instance_customer_id') route_instance_customer_id: number) {
        // Lấy các bản ghi liên kết
        const ricImages = await this.service.findAll();
        const filtered = ricImages.filter(img => img.route_instance_customer_id === Number(route_instance_customer_id));
        // Lấy thông tin ảnh từ imageRepo
        const images = await Promise.all(filtered.map(async (ric) => {
            const image = await this.imageRepo.findOneBy({ id: ric.image });
            return image ? { ...image, route_instance_customer_image_id: ric.id } : null;
        }));
        return images.filter(Boolean);
    }

    /**
     * Upload image for a route_instance_customer
     * Body: multipart/form-data with file, and route_instance_customer_id
     */
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(
        @UploadedFile() file: MulterFile,
        @Body('route_instance_customer_id') route_instance_customer_id: number,
    ) {
        if (!file) throw new BadRequestException('No file uploaded');
        if (!route_instance_customer_id) throw new BadRequestException('Missing route_instance_customer_id');

        // Save image to image table
        const image = this.imageRepo.create({
            file_name: file.originalname,
            link: '', // You can generate a link if you serve images via API
            mime_type: file.mimetype,
            image_data: file.buffer,
        });
        const savedImage = await this.imageRepo.save(image);

        // Save relation to route_instance_customer_image
        const ricImage = await this.service.create({
            route_instance_customer_id: Number(route_instance_customer_id),
            image: savedImage.id,
        });

        return {
            image_id: savedImage.id,
            route_instance_customer_image_id: ricImage.id,
        };
    }

    @Get()
    findAll(): Promise<RouteInstanceCustomerImage[]> {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<RouteInstanceCustomerImage | null> {
        return this.service.findOne(Number(id));
    }

    @Post()
    create(@Body() data: Partial<RouteInstanceCustomerImage>): Promise<RouteInstanceCustomerImage> {
        return this.service.create(data);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: Partial<RouteInstanceCustomerImage>): Promise<RouteInstanceCustomerImage | null> {
        return this.service.update(Number(id), data);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.service.remove(Number(id));
    }
}
