import { Component, OnInit } from '@angular/core';
import { TodoList } from '../interfaces/todo-list';
import { TodoListService } from '../todo-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private todoListService: TodoListService) {}
  public lists: TodoList[] = [];
  todoListInput = '';

  ngOnInit(): void {
    this.todoListService.getAll().subscribe((lists) => (this.lists = lists));
  }

  public addNewList(title: string): void {
    this.todoListService.add(title);
    // var newTodoList: TodoList = { id: this.getId(), title: title, todos: [] };
    // this.lists.push(newTodoList);
    this.todoListInput = '';
  }
  private getId(): number {
    return this.lists.length + 1;
  }
}
