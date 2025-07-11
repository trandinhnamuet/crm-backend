import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { RouteTemplateCustomerService } from './route_template_customer.service';
import { RouteTemplateCustomer } from './route_template_customer.entity';

@Controller('route-template-customers')
export class RouteTemplateCustomerController {
  constructor(private readonly routeTemplateCustomerService: RouteTemplateCustomerService) {}

  @Get()
  findAll(): Promise<RouteTemplateCustomer[]> {
    return this.routeTemplateCustomerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RouteTemplateCustomer> {
    const entity = await this.routeTemplateCustomerService.findOne(Number(id));
    if (!entity) throw new NotFoundException('RouteTemplateCustomer not found');
    return entity;
  }

  @Post()
  create(@Body() data: Partial<RouteTemplateCustomer>): Promise<RouteTemplateCustomer> {
    return this.routeTemplateCustomerService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<RouteTemplateCustomer>): Promise<RouteTemplateCustomer> {
    const entity = await this.routeTemplateCustomerService.update(Number(id), data);
    if (!entity) throw new NotFoundException('RouteTemplateCustomer not found');
    return entity;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.routeTemplateCustomerService.remove(Number(id));
  }
}
