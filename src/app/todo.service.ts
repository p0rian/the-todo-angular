import { Injectable } from '@angular/core';
import { TodoItem } from './todo-item';
import { Observable, of } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: TodoItem[] = [];
  key = 'todos';
  constructor(private localService: LocalService) {}

  getTodos(): Observable<TodoItem[]> {
    const storedTodos = this.localService.getData(this.key);

    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }

    return of(this.todos);
  }
  addTodo(todoDescription: string): void {
    const newTodo = {
      id: this.getId(),
      description: todoDescription,
      isDone: false,
    };

    this.todos.push(newTodo);
    this.saveTodos();
  }

  removeTodo(todo: TodoItem): void {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.saveTodos();
    }
  }

  private saveTodos(): void {
    // Save the updated todos array to localStorage
    this.localService.saveData(this.key, JSON.stringify(this.todos));
  }
  filterTodos(searchInput: string): Observable<TodoItem[]> {
    return of(
      this.todos.filter((todo: TodoItem) =>
        todo.description.includes(searchInput)
      )
    );
  }

  private getId(): number {
    return this.todos.length + 1;
  }
}
