import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../general/user/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'johndoe' },
        password: { type: 'string', example: 'yourpassword' },
      },
      required: ['username', 'password'],
    },
    description: 'Đăng nhập với username và password',
  })
  @ApiResponse({ status: 201, description: 'Đăng nhập thành công, trả về thông tin user (không có password)' })
  @ApiResponse({ status: 400, description: 'Username không tồn tại hoặc sai password' })
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;

    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new BadRequestException('Username không tồn tại');
    }

    if (user.password !== password) {
      throw new BadRequestException('Sai password');
    }

    // Không trả về password
    const { password: _, ...userInfo } = user;
    return userInfo;
  }
}
