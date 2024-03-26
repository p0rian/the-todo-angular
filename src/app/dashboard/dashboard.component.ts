import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { TodoList } from '../interfaces/todo-list';
import { TodoListService } from '../todo-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private todoListService: TodoListService, private renderer: Renderer2) { }
  @ViewChild('toDoListContainer') listContainer!: ElementRef;
  public lists: Array<TodoList | null> = [];
  todoListInput = '';

  ngOnInit(): void {
    this.todoListService.getAll().subscribe((lists) => {
      this.lists = lists;
      this.updateListsToDisplay();
    });
  }

  addNewList(title: string): void {
    this.todoListService.add(title);
    this.todoListInput = '';
  }

  private updateListsToDisplay(): void {
    this.listsToDisplay = this.lists.filter(l => l !== null) as TodoList[];
  }

  get listsToDisplay(): TodoList[] {
    return this._listsToDisplay;
  }

  set listsToDisplay(value: TodoList[]) {
    this._listsToDisplay = value;
  }

  private _listsToDisplay: TodoList[] = [];
}
