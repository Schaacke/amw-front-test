import { createContext, ReactNode } from 'react';
import RootStore from '../store/RootStore.ts';

export const rootStore = new RootStore();
export const StoreContext = createContext<RootStore>(rootStore);

export function RootStoreProvider({ children }: { children: ReactNode }) {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
}
