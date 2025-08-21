import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteInstance } from './route_instance.entity';
import { RouteInstanceService } from './route_instance.service';
import { RouteInstanceController } from './route_instance.controller';
import { RouteScheduleModule } from '../_schedule/route_schedule.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RouteInstance]),
    RouteScheduleModule
  ],
  providers: [RouteInstanceService],
  controllers: [RouteInstanceController],
})
export class RouteInstanceModule { }
