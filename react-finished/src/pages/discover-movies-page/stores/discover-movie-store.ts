import { create } from 'zustand';

import type { Store } from '$/lib/utils';
import type { DiscoverMovieSortBy } from '$/services/movies/movies.fetch';

type DiscoverMovieState = {
  sortBy: DiscoverMovieSortBy;
};

type DiscoverMovieActions = {
  sortResults: (sortBy: DiscoverMovieSortBy) => void;
};

const initialState: DiscoverMovieState = {
  sortBy: 'popularity.desc',
};

export const useDiscoverMovieStore = create<
  Store<DiscoverMovieState, DiscoverMovieActions>
>()((set) => ({
  ...initialState,
  actions: {
    sortResults: (sortBy) => set({ sortBy }),
  },
}));

export const useDiscoverMovieActions = () =>
  useDiscoverMovieStore((state) => state.actions);

export const useDiscoverMovieSortBy = () =>
  useDiscoverMovieStore((state) => state.sortBy);
