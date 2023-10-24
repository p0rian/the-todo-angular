import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../todo-item';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  todoName = '';
  todos: TodoItem[] = [];

  constructor(private todoService: TodoService) {}

  public addItem(description: string): void {
    description = description.trim();
    if (!description) return;
    this.todoName = '';
    this.todoService.addTodo(description);
    this.getTodos();
  }

  public changeDoneState(todo: TodoItem): void {
    todo.isDone = !todo.isDone;
  }

  public filterTodos(searchInput: string): void {
    this.todoService
      .filterTodos(searchInput)
      .subscribe((todos) => (this.todos = todos));
  }
  public removeTodo(todo: TodoItem): void {
    this.todoService.removeTodo(todo);
    this.getTodos();
  }
  public getTodosCount(): number {
    return this.todos.length;
  }
  public getDoneTodosCount(): number {
    return this.todos.filter((todo: TodoItem) => todo.isDone === true).length;
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  ngOnInit(): void {
    this.getTodos();
  }
}
