import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteTemplate } from './route_template.entity';

@Injectable()
export class RouteTemplateService {
  constructor(
    @InjectRepository(RouteTemplate)
    private routeTemplateRepository: Repository<RouteTemplate>,
  ) {}

  findAll(): Promise<RouteTemplate[]> {
    return this.routeTemplateRepository.find({
      relations: ['assignedEmployee']
    });
  }

  async findOne(id: number): Promise<RouteTemplate | null> {
    return this.routeTemplateRepository.findOne({
      where: { id },
      relations: ['assignedEmployee']
    });
  }

  create(data: Partial<RouteTemplate>): Promise<RouteTemplate> {
    const entity = this.routeTemplateRepository.create(data);
    return this.routeTemplateRepository.save(entity);
  }

  async update(id: number, data: Partial<RouteTemplate>): Promise<RouteTemplate | null> {
    await this.routeTemplateRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.routeTemplateRepository.delete(id);
  }
}
