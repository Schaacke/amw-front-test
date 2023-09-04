import { TodosStore } from './TodosStore.ts';

export default class RootStore {
  todosStore: TodosStore;

  constructor() {
    this.todosStore = new TodosStore(this);
  }
}
