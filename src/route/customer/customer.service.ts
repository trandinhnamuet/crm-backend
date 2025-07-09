import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
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
