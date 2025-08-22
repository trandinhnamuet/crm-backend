import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { CustomerModule } from './route/customer/customer.module';
import { RouteTemplateModule } from './route/route_template/route_template.module';
import { RouteTemplateCustomerModule } from './route/route_template_customer/route_template_customer.module';
import { UserModule } from './general/user/user.module';
import { RouteInstanceModule } from './route/route_instance/route_instance.module';
import { AuthModule } from './auth/auth.module';
import { RouteInstanceCustomerModule } from './route/route_instance_customer/route_instance_customer.module';
import { GoogleMapModule } from './route/google_map/google_map.module';
import { RouteInstanceCustomerImageModule } from './route/route_instance_customer_image/route_instance_customer_image.module';
import { ImageModule } from './general/image/image.module';

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
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        migrationsTableName: 'migrations',
        cli: {
          migrationsDir: 'migrations',
        },
      }),
      inject: [ConfigService],
    }),
    CustomerModule,
    RouteTemplateModule,
    RouteTemplateCustomerModule,
    UserModule,
    RouteInstanceModule,
    AuthModule,
    RouteInstanceCustomerModule,
    GoogleMapModule,
    RouteInstanceCustomerImageModule,
    ImageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
