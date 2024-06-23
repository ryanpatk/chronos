import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Space } from './entities/space.entity';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space)
    private spaceRepository: Repository<Space>,
  ) {}

  async createSpace(name: string, userId: number): Promise<Space> {
    const space = new Space();
    space.name = name;
    space.userId = userId;
    return this.spaceRepository.save(space);
  }

  async findSpacesByUser(userId: number): Promise<Space[]> {
    return this.spaceRepository.find({ where: { userId } });
  }

  // Other space-related methods (update, delete, etc.)
}
