import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // chỉ dùng dev, production thì bỏ
      }),
      inject: [ConfigService],
    }),
    // ...existing code...
    require('./route/customer/customer.module').CustomerModule,
    require('./route/route_template/route_template.module').RouteTemplateModule,
    require('./general/user/user.module').UserModule,
    require('./route/route_instance/route_instance.module').RouteInstanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
