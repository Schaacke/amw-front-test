import { useRootStore } from './useRootStore.ts';

export function useTodosStore() {
  const { todosStore } = useRootStore();
  return todosStore;
}
