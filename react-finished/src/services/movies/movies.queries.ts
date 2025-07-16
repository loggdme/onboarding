import { infiniteQueryOptions } from '@tanstack/react-query';

import { discoverMovies } from '$/services/movies/movies.fetch';

export const discoverMoviesQuery = infiniteQueryOptions({
  queryKey: ['movies'],
  queryFn: ({ signal, pageParam }) => discoverMovies(signal, { page: pageParam }),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => (lastPage.page + 1 < lastPage.total_pages ? lastPage.page + 1 : undefined),
});
