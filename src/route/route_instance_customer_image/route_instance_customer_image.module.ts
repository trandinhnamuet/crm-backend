import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteInstanceCustomerImage } from './route_instance_customer_image.entity';
import { RouteInstanceCustomerImageService } from './route_instance_customer_image.service';
import { RouteInstanceCustomerImageController } from './route_instance_customer_image.controller';
import { Image } from 'src/general/image/image.entity';

@Module({
	imports: [TypeOrmModule.forFeature([RouteInstanceCustomerImage, Image])],
	providers: [RouteInstanceCustomerImageService],
	controllers: [RouteInstanceCustomerImageController],
})
export class RouteInstanceCustomerImageModule {}
