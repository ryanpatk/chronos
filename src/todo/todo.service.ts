// Import necessary decorators and modules from Nest.js and TypeORM.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Import the Todo entity which represents the structure of our data in the database.
import { Todo } from './entities/todo.entity';

// The @Injectable() decorator marks the class as a provider that can be managed by Nest's IoC container.
@Injectable()
export class TodoService {

  // The constructor injects the Todo repository, which provides methods to interact with the database.
  constructor(
    // @InjectRepository(Todo) tells Nest to inject the repository for the Todo entity.
    @InjectRepository(Todo)
    private todoReposity: Repository<Todo>
  ) { }

  // Method to fetch all Todo items from the database.
  findAll() {
    return this.todoReposity.find();
  }

  // Method to create a new Todo item in the database.
  create(title: string) {
    const todo = new Todo();  // Create a new Todo instance.
    todo.title = title;       // Assign the provided title to the Todo instance.
    return this.todoReposity.save(todo);  // Save the Todo instance to the database.
  }

  // Method to update the 'isCompleted' status of a Todo item.
  async update(id: number, isCompleted: boolean) {
    // Find the Todo item with the provided ID.
    const todo = await this.todoReposity.findOne({ where: { id: id } });
    if (todo) {  // If the Todo item exists...
      todo.isCompleted = isCompleted;  // Update its 'isCompleted' status.
      return this.todoReposity.save(todo);  // Save the updated Todo item to the database.
    }
    return null;  // If the Todo item doesn't exist, return null.
  }

  // Method to delete a Todo item from the database.
  async delete(id: number) {
    // Delete the Todo item with the provided ID and return a promise.
    // The .then(() => {}) ensures the method returns a promise that resolves to void.
    return await this.todoReposity.delete(id).then(() => { });
  }
}
