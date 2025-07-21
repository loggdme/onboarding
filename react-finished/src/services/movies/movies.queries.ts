import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import {
  type DiscoverMovieOptions,
  discoverMovies,
  getMovieDetails,
} from '$/services/movies/movies.fetch';

export const discoverMoviesQuery = (opt: DiscoverMovieOptions) =>
  infiniteQueryOptions({
    queryKey: ['movies', opt.sortBy],
    queryFn: ({ signal, pageParam }) =>
      discoverMovies(signal, { page: pageParam, ...opt }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page + 1 < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });

export const movieDetailsQuery = (id: string) =>
  queryOptions({
    queryKey: ['movie', id],
    queryFn: ({ signal }) => getMovieDetails(signal, id),
  });
