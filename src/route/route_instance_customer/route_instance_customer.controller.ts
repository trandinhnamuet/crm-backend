import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { RouteInstanceCustomerService } from './route_instance_customer.service';
import { RouteInstanceCustomer } from './route_instance_customer.entity';

@Controller('route-instance-customers')
export class RouteInstanceCustomerController {
  constructor(private readonly ricService: RouteInstanceCustomerService) {}

  @Get()
  findAll(): Promise<RouteInstanceCustomer[]> {
    return this.ricService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RouteInstanceCustomer> {
    const ric = await this.ricService.findOne(Number(id));
    if (!ric) throw new NotFoundException('RouteInstanceCustomer not found');
    return ric;
  }

  @Get('by-route-instance/:routeInstanceId')
  async getByRouteInstance(@Param('routeInstanceId') routeInstanceId: number): Promise<RouteInstanceCustomer[]> {
    return this.ricService.findByRouteInstance(Number(routeInstanceId));
  }

  @Get('by-customer/:customer_id')
  async getByCustomer(@Param('customer_id') customerId: number): Promise<RouteInstanceCustomer[]> {
    return this.ricService.findByCustomer(Number(customerId));
  }

  @Post()
  create(@Body() data: Partial<RouteInstanceCustomer>): Promise<RouteInstanceCustomer> {
    return this.ricService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<RouteInstanceCustomer>): Promise<RouteInstanceCustomer> {
    const ric = await this.ricService.update(Number(id), data);
    if (!ric) throw new NotFoundException('RouteInstanceCustomer not found');
    return ric;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.ricService.remove(Number(id));
  }
}
