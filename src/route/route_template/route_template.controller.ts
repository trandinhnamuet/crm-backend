import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { RouteTemplateService } from './route_template.service';
import { RouteTemplate } from './route_template.entity';

@Controller('route-templates')
export class RouteTemplateController {
  constructor(private readonly routeTemplateService: RouteTemplateService) {}

  @Get()
  findAll(): Promise<RouteTemplate[]> {
    return this.routeTemplateService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RouteTemplate> {
    const entity = await this.routeTemplateService.findOne(Number(id));
    if (!entity) throw new NotFoundException('Route template not found');
    return entity;
  }

  @Post()
  create(@Body() data: Partial<RouteTemplate>): Promise<RouteTemplate> {
    return this.routeTemplateService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<RouteTemplate>): Promise<RouteTemplate> {
    const entity = await this.routeTemplateService.update(Number(id), data);
    if (!entity) throw new NotFoundException('Route template not found');
    return entity;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.routeTemplateService.remove(Number(id));
  }
}
