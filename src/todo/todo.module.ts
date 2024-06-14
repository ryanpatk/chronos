// Import necessary decorators and modules from Nest.js and TypeORM.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import the service, controller, and entity related to the Todo feature.
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './entities/todo.entity';

// Use the @Module decorator to declare a module in Nest.js.
@Module({
  // The 'imports' array specifies which other modules this module uses.
  // Here, we're importing TypeOrmModule.forFeature([Todo]) to bind the Todo entity
  // with its corresponding repository provided by TypeORM.
  imports: [TypeOrmModule.forFeature([Todo])],

  // The 'controllers' array lists the controllers to instantiate for this module.
  // Controllers handle incoming requests and return responses.
  controllers: [TodoController],

  // The 'providers' array lists the providers to instantiate for this module.
  // Providers can be services, repositories, factories, etc. They can be injected into
  // controllers or other services, making Nest.js applications modular and efficient.
  providers: [TodoService],
})
export class TodoModule {}
