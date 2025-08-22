import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { RouteInstanceCustomerImage } from 'src/route/route_instance_customer_image/route_instance_customer_image.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Image, RouteInstanceCustomerImage])],
	providers: [ImageService],
	controllers: [ImageController],
})
export class ImageModule {}
