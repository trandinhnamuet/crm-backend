import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as process from 'process';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    const entity = await this.userService.findOne(Number(id));
    if (!entity) throw new NotFoundException('User not found');
    let image_url = '';
    if (entity.image_id) {
      const host = process.env.HOST;
      image_url = `${host}/images/link/${entity.image_id}`;
    }
    return { ...entity, image_url };
  }

  @Post()
  create(@Body() data: Partial<User>): Promise<User> {
    return this.userService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<User>): Promise<User> {
    const entity = await this.userService.update(Number(id), data);
    if (!entity) throw new NotFoundException('User not found');
    return entity;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(Number(id));
  }
}
