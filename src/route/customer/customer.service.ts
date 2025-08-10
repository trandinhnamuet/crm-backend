import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { RouteTemplateCustomer } from '../route_template_customer/route_template_customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(RouteTemplateCustomer)
    private rtcRepository: Repository<RouteTemplateCustomer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findByRouteTemplate(routeTemplateId: number): Promise<Customer[]> {
    const rtcList = await this.rtcRepository.find({ where: { route_template_id: routeTemplateId }, relations: ['customer'] });
    return rtcList.map(rtc => rtc.customer);
  }

  async findOne(id: number): Promise<Customer | null> {
    return this.customerRepository.findOneBy({ id });
  }

  create(data: Partial<Customer>): Promise<Customer> {
    const customer = this.customerRepository.create(data);
    return this.customerRepository.save(customer);
  }

  async update(id: number, data: Partial<Customer>): Promise<Customer | null> {
    await this.customerRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
