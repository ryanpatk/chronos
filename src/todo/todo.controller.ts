// Import necessary decorators and modules from Nest.js.
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

// Import the TodoService which provides methods to interact with the database.
import { TodoService } from './todo.service';

// The @Controller() decorator declares that this class is a controller and specifies the route path for all its routes.
@Controller('todos')
export class TodoController {
  // The constructor injects the TodoService, which provides methods to interact with the database.
  constructor(private readonly todoService: TodoService) {}

  // The @Get() decorator declares that this method handles HTTP GET requests.
  @Get()
  findAll() {
    // Fetch all Todo items from the database.
    return this.todoService.findAll();
  }

  // The @Post() decorator declares that this method handles HTTP POST requests.
  @Post()
  create(
    // The @Body('title') decorator retrieves the 'title' field from the request body.
    @Body('title') title: string,
  ) {
    // Create a new Todo item in the database with the provided title.
    return this.todoService.create(title);
  }

  // The @Put(':id') decorator declares that this method handles HTTP PUT requests
  // and expects an 'id' parameter in the URL.
  @Put(':id')
  update(
    // The @Param('id') decorator retrieves the 'id' parameter from the URL.
    @Param('id') id: number,
    // The @Body('isCompleted') decorator retrieves the 'isCompleted' field from the request body.
    @Body('isCompleted') isCompleted: boolean,
  ) {
    // Update the 'isCompleted' status of the Todo item with the provided ID.
    return this.todoService.update(id, isCompleted);
  }

  // The @Delete(':id') decorator declares that this method handles HTTP DELETE requests
  // and expects an 'id' parameter in the URL.
  @Delete(':id')
  delete(
    // The @Param('id') decorator retrieves the 'id' parameter from the URL.
    @Param('id') id: number,
  ) {
    // Delete the Todo item with the provided ID from the database.
    return this.todoService.delete(id);
  }
}
