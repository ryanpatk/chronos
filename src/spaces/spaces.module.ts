import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';
import { Space } from './entities/space.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Space]), AuthModule],
  controllers: [SpaceController],
  providers: [SpaceService],
})
export class SpacesModule {}
