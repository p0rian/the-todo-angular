import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { TodoList } from '../interfaces/todo-list';
import { TodoListService } from '../todo-list.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  @Input() todoList!: TodoList;
  todoInput = '';
  searchText = '';
  filteredTodos: TodoItem[] = [];

  constructor(private todoListService: TodoListService) {}
  ngOnInit() {
    this.updateFilteredTodos();
  }

  private refetchList() {
    var result;
    this.todoListService
      .getById(this.todoList.id)
      .subscribe((todoList) => (result = todoList));

    if (result != null) {
      this.todoList = result;
    }
  }

  private addItem(newTodoItem: TodoItem) {
    this.todoListService.addItem(newTodoItem, this.todoList.id);
  }

  public updateFilteredTodos(): void {
    this.refetchList();
    this.filteredTodos = this.todoList.todos.filter((todo) =>
      todo.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  public add(description: string): void {
    description = description.trim();
    if (!description) return;
    this.todoInput = '';
    var todoToAdd: TodoItem = {
      id: this.getId(),
      description: description,
      isDone: false,
    };
    // this.todoList.todos.push(todoToAdd);
    this.addItem(todoToAdd);
    this.updateFilteredTodos(); // Update filteredTodos after adding a new item
  }

  public changeDoneState(todo: TodoItem): void {
    todo.isDone = !todo.isDone;
    this.updateFilteredTodos(); // Update filteredTodos after changing the done state
  }

  public removeTodo(todo: TodoItem): void {
    const index = this.todoList.todos.indexOf(todo);
    if (index !== -1) {
      this.todoList.todos.splice(index, 1);
      this.updateFilteredTodos(); // Update filteredTodos after removing an item
    }
  }

  public filterTodos(searchInput: string): void {
    this.filteredTodos = this.todoList.todos.filter((todo: TodoItem) =>
      todo.description.includes(searchInput)
    );
  }

  public getTodosCount(): number {
    return this.filteredTodos.length;
  }

  public getDoneTodosCount(): number {
    return this.filteredTodos.filter((todo: TodoItem) => todo.isDone === true)
      .length;
  }

  public closeList(): void {}

  private getId(): number {
    return this.todoList.todos.length + 1;
  }
}
