import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Controller('google-map')
export class GoogleMapController {
	@Get('directions')
	async getDirections(
		@Query('origin') origin: string,
		@Query('destination') destination: string,
		@Query('mode') mode: string = 'driving',
	) {
		const apiKey = process.env.GOOGLE_MAPS_API_KEY;
		if (!apiKey) {
			throw new HttpException('Google Maps API key not configured', HttpStatus.INTERNAL_SERVER_ERROR);
		}
		const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=${mode}&key=${apiKey}`;
		try {
			const response = await axios.get(url);
			return response.data;
		} catch (error) {
			throw new HttpException('Failed to fetch directions from Google Maps', HttpStatus.BAD_GATEWAY);
		}
	}
}
