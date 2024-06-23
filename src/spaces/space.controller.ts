import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { SpaceService } from './space.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('spaces')
@UseGuards(JwtAuthGuard)
export class SpaceController {
  constructor(private spaceService: SpaceService) {}

  @Post()
  async createSpace(@Body('name') name: string, @GetUser('id') userId: number) {
    return this.spaceService.createSpace(name, userId);
  }

  @Get()
  async findSpacesByUser(@GetUser('id') userId: number) {
    return this.spaceService.findSpacesByUser(userId);
  }
}
