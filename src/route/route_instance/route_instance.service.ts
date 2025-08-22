import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteInstance } from './route_instance.entity';

@Injectable()
export class RouteInstanceService {
  constructor(
    @InjectRepository(RouteInstance)
    private routeInstanceRepository: Repository<RouteInstance>,
  ) {}

  findAll(): Promise<RouteInstance[]> {
    return this.routeInstanceRepository.find({ 
      relations: ['route_template', 'assignedEmployee'] 
    });
  }

  async findOne(id: number): Promise<RouteInstance | null> {
    return this.routeInstanceRepository.findOne({
      where: { id },
      relations: ['route_template', 'assignedEmployee']
    });
  }

  create(data: Partial<RouteInstance>): Promise<RouteInstance> {
    const entity = this.routeInstanceRepository.create(data);
    return this.routeInstanceRepository.save(entity);
  }

  async update(id: number, data: Partial<RouteInstance>): Promise<RouteInstance | null> {
    await this.routeInstanceRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.routeInstanceRepository.delete(id);
  }
}
