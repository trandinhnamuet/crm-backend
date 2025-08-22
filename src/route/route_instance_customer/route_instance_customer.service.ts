import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteInstanceCustomer } from './route_instance_customer.entity';

@Injectable()
export class RouteInstanceCustomerService {
  constructor(
    @InjectRepository(RouteInstanceCustomer)
    private ricRepository: Repository<RouteInstanceCustomer>,
  ) {}

  findAll(): Promise<RouteInstanceCustomer[]> {
    return this.ricRepository.find({
      relations: ['customer']
    });
  }

  async findByRouteInstance(routeInstanceId: number): Promise<RouteInstanceCustomer[]> {
    return this.ricRepository.find({ 
      where: { route_instance_id: routeInstanceId },
      relations: ['customer']
    });
  }

  async findByCustomer(customerId: number): Promise<RouteInstanceCustomer[]> {
    return this.ricRepository.find({ 
      where: { customer_id: customerId },
      relations: ['customer', 'route_instance', 'route_instance.route_template', 'route_instance.assignedEmployee']
    });
  }

  async findOne(id: number): Promise<RouteInstanceCustomer | null> {
    return this.ricRepository.findOne({
      where: { id },
      relations: ['customer']
    });
  }

  create(data: Partial<RouteInstanceCustomer>): Promise<RouteInstanceCustomer> {
    const ric = this.ricRepository.create(data);
    return this.ricRepository.save(ric);
  }

  async update(id: number, data: Partial<RouteInstanceCustomer>): Promise<RouteInstanceCustomer | null> {
    await this.ricRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ricRepository.delete(id);
  }
}
