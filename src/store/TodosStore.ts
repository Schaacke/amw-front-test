import { makeAutoObservable } from 'mobx';
import RootStore from './RootStore.ts';
import api from '../services/api';

export interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  description?: string;
}

export class TodosStore {
  rootStore: RootStore;
  loading: boolean;
  error: boolean;
  todos: Todos[];

  constructor(root: RootStore) {
    this.rootStore = root;
    this.loading = false;
    this.error = false;
    this.todos = [];
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setLoading = (value: boolean) => {
    this.loading = value;
  };

  setError = (value: boolean) => {
    this.error = value;
  };

  setTodosData = (data: Todos[]) => {
    this.todos = [...data];
  };

  getTodos = async (page: number) => {
    this.setLoading(true);
    try {
      const data = await api.todos.getTodos(page);
      this.setTodosData(data);
    } catch (e) {
      this.setError(true);
    } finally {
      this.setLoading(false);
    }
  };
}
