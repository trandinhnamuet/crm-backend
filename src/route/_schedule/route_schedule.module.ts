import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { DailyScanRouteTemplateService } from './daily_scan_route_template';
import { RouteTemplate } from '../route_template/route_template.entity';
import { RouteInstance } from '../route_instance/route_instance.entity';
import { RouteTemplateCustomer } from '../route_template_customer/route_template_customer.entity';
import { RouteInstanceCustomer } from '../route_instance_customer/route_instance_customer.entity';
import { FileLoggerService } from '../../logger/file-logger.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      RouteTemplate,
      RouteInstance,
      RouteTemplateCustomer,
      RouteInstanceCustomer,
    ]),
  ],
  providers: [DailyScanRouteTemplateService, FileLoggerService],
  exports: [DailyScanRouteTemplateService, FileLoggerService],
})
export class RouteScheduleModule {}
