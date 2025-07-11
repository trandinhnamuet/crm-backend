import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteTemplateCustomer } from './route_template_customer.entity';
import { RouteTemplateCustomerService } from './route_template_customer.service';
import { RouteTemplateCustomerController } from './route_template_customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RouteTemplateCustomer])],
  providers: [RouteTemplateCustomerService],
  controllers: [RouteTemplateCustomerController],
})
export class RouteTemplateCustomerModule {}
