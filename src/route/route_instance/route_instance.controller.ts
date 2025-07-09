import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { RouteInstanceService } from './route_instance.service';
import { RouteInstance } from './route_instance.entity';

@Controller('route-instances')
export class RouteInstanceController {
  constructor(private readonly routeInstanceService: RouteInstanceService) {}

  @Get()
  findAll(): Promise<RouteInstance[]> {
    return this.routeInstanceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RouteInstance> {
    const entity = await this.routeInstanceService.findOne(Number(id));
    if (!entity) throw new NotFoundException('Route instance not found');
    return entity;
  }

  @Post()
  create(@Body() data: Partial<RouteInstance>): Promise<RouteInstance> {
    return this.routeInstanceService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<RouteInstance>): Promise<RouteInstance> {
    const entity = await this.routeInstanceService.update(Number(id), data);
    if (!entity) throw new NotFoundException('Route instance not found');
    return entity;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.routeInstanceService.remove(Number(id));
  }
}
