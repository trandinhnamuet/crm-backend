import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { RouteInstanceService } from './route_instance.service';
import { RouteInstance } from './route_instance.entity';
import { DailyScanRouteTemplateService } from '../_schedule/daily_scan_route_template';

@Controller('route-instances')
export class RouteInstanceController {
  constructor(
    private readonly routeInstanceService: RouteInstanceService,
    private readonly dailyScanService: DailyScanRouteTemplateService,
  ) {}

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

  @Post('create-from-template/:templateId')
  async createFromTemplate(@Param('templateId') templateId: number): Promise<{ message: string }> {
    try {
      // Gọi hàm tạo route instance từ template với ngày hiện tại
      const today = new Date();
      
      await this.dailyScanService.createInstanceFromTemplate(Number(templateId), today);
      
      return { message: `Route instance đã được tạo thành công từ template ${templateId}` };
    } catch (error) {
      throw new NotFoundException(`Không thể tạo route instance từ template ${templateId}: ${error.message}`);
    }
  }
}
