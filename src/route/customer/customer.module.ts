import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { RouteTemplateCustomer } from '../route_template_customer/route_template_customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, RouteTemplateCustomer])],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
