import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './entities/todo.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), AuthModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
