import { create } from 'zustand';

import type { Store } from '$/lib/utils';

type CounterState = {
  count: number;
};

type CounterActions = {
  increase: (by: number) => void;
  decrease: (by: number) => void;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

const initialState: CounterState = {
  count: 0,
};

export const useCounterStore = create<Store<CounterState, CounterActions>>()((set) => ({
  ...initialState,
  actions: {
    reset: () => set(initialState),
    increase: (by) => set((state) => ({ count: state.count + by })),
    decrease: (by) => set((state) => ({ count: state.count - by })),
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  },
}));

export const useCount = () => useCounterStore((state) => state.count);
export const useCounterActions = () => useCounterStore((state) => state.actions);
