import { TodoItem } from './todo-item';

export interface TodoList {
  id: number;
  title: string;
  todos: TodoItem[];
}
