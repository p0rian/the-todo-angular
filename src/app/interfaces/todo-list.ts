import { TodoItem } from './todo-item';

export interface TodoList {
  id: number;
  title: string;
  margin: { top: number; left: number };
  todos: TodoItem[];
}
