// Zustand store for to-do state
import { create } from 'zustand';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
}

interface TodoState {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((state) => ({ todos: [todo, ...state.todos] })),
  updateTodo: (todo) => set((state) => ({ todos: state.todos.map((t) => t.id === todo.id ? todo : t) })),
  deleteTodo: (id) => set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
}));
