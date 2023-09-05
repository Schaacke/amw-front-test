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
  loaded: boolean;

  constructor(root: RootStore) {
    this.rootStore = root;
    this.loading = false;
    this.error = false;
    this.todos = [];
    this.loaded = false;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setLoading = (value: boolean) => {
    this.loading = value;
  };

  setError = (value: boolean) => {
    this.error = value;
  };

  setTodosData = (data: Todos[]) => {
    const tempArr = [...this.todos, ...data];
    this.todos = [...new Map(tempArr.map((item) => [item.id, item])).values()];
    if (data.length === 0) this.loaded = true;
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
