import { type ClassValue, clsx } from 'clsx';

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export type Store<S, A> = S & { actions: A };
export type Breakpoint = { maxWidth: number; columns: number };
