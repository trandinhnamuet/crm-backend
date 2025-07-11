import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Customer> {
    const customer = await this.customerService.findOne(Number(id));
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }


  @Get('by-route-template/:routeTemplateId')
  async getByRouteTemplate(@Param('routeTemplateId') routeTemplateId: number): Promise<Customer[]> {
    return this.customerService.findByRouteTemplate(Number(routeTemplateId));
  }

  @Post()
  create(@Body() data: Partial<Customer>): Promise<Customer> {
    return this.customerService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<Customer>): Promise<Customer> {
    const customer = await this.customerService.update(Number(id), data);
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.customerService.remove(Number(id));
  }
}
