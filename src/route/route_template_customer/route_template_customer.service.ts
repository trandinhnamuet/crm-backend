import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteTemplateCustomer } from './route_template_customer.entity';

@Injectable()
export class RouteTemplateCustomerService {
  constructor(
    @InjectRepository(RouteTemplateCustomer)
    private routeTemplateCustomerRepository: Repository<RouteTemplateCustomer>,
  ) {}

  findAll(): Promise<RouteTemplateCustomer[]> {
    return this.routeTemplateCustomerRepository.find();
  }

  async findOne(id: number): Promise<RouteTemplateCustomer | null> {
    return this.routeTemplateCustomerRepository.findOneBy({ id });
  }

  create(data: Partial<RouteTemplateCustomer>): Promise<RouteTemplateCustomer> {
    const entity = this.routeTemplateCustomerRepository.create(data);
    return this.routeTemplateCustomerRepository.save(entity);
  }

  async update(id: number, data: Partial<RouteTemplateCustomer>): Promise<RouteTemplateCustomer | null> {
    await this.routeTemplateCustomerRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.routeTemplateCustomerRepository.delete(id);
  }
}
