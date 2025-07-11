import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, require('./route_template_customer.entity').RouteTemplateCustomer])],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
