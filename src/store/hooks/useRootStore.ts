import { useContext } from 'react';
import { StoreContext } from '../../providers/RootStoreProvider.tsx';

export function useRootStore() {
  return useContext(StoreContext);
}
