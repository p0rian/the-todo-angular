import { Injectable } from '@angular/core';
import { LocalService } from './local.service';
import { TodoList } from './interfaces/todo-list';
import { Observable, of } from 'rxjs';
import { TodoItem } from './interfaces/todo-item';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private todoLists: TodoList[] = [];
  private key: string = 'todoLists';

  constructor(private localService: LocalService) {}

  getAll(): Observable<TodoList[]> {
    const storedTodoLists = this.localService.getData(this.key);

    if (storedTodoLists) {
      this.todoLists = JSON.parse(storedTodoLists);
    }

    return of(this.todoLists);
  }

  getById(id: number): Observable<TodoList | null> {
    if (this.todoLists.length > 0) {
      var foundTodoList = this.todoLists.find((todoList) => todoList.id === id);
      return of(foundTodoList || null);
    }

    const storedTodoLists = this.localService.getData(this.key);
    if (storedTodoLists) {
      var parsedTodoLists: TodoList[] = JSON.parse(storedTodoLists);
      var foundTodoList = parsedTodoLists.find(
        (todoList) => todoList.id === id
      );
      return of(foundTodoList || null);
    }

    return of(null);
  }

  add(title: string) {
    var newTodoList: TodoList = { id: this.getId(), title: title, todos: [] };
    this.todoLists.push(newTodoList);
    this.saveTodoLists();
  }

  addItem(newItem: TodoItem, listId: number) {
    var foundTodoList = this.findTodoList(listId);
    foundTodoList?.todos.push(newItem);
    this.saveTodoLists();
  }

  deleteItem(removedItemIndex: number, listId: number) {
    var foundTodoList = this.findTodoList(listId);
    foundTodoList?.todos.splice(removedItemIndex, 1);
    this.saveTodoLists();
  }

  remove(todoList: TodoList): void {
    const index = this.todoLists.indexOf(todoList);
    if (index !== -1) {
      this.todoLists.splice(index, 1);
      this.saveTodoLists();
    }
  }

  private findTodoList(listId: number): TodoList | null {
    var foundTodoList = this.todoLists.find(
      (todoList) => todoList.id === listId
    );

    return foundTodoList || null;
  }

  private saveTodoLists(): void {
    this.localService.saveData(this.key, JSON.stringify(this.todoLists));
  }

  private getId(): number {
    return this.todoLists.length + 1;
  }
}
