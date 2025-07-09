import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteTemplate } from './route_template.entity';
import { RouteTemplateService } from './route_template.service';
import { RouteTemplateController } from './route_template.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RouteTemplate])],
  providers: [RouteTemplateService],
  controllers: [RouteTemplateController],
})
export class RouteTemplateModule {}
