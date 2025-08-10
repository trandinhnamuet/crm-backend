import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteInstanceCustomer } from './route_instance_customer.entity';
import { RouteInstanceCustomerService } from './route_instance_customer.service';
import { RouteInstanceCustomerController } from './route_instance_customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RouteInstanceCustomer])],
  providers: [RouteInstanceCustomerService],
  controllers: [RouteInstanceCustomerController],
})
export class RouteInstanceCustomerModule {}
