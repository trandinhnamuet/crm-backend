import { Module } from '@nestjs/common';
import { GoogleMapController } from './google_map.controller';

@Module({
	controllers: [GoogleMapController],
})
export class GoogleMapModule {}
