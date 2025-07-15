import { queryOptions } from '@tanstack/react-query';

import { discoverMovies } from '$/services/movies/movies.fetch';

export const discoverMoviesQuery = queryOptions({
  queryKey: ['movies'],
  queryFn: ({ signal }) => discoverMovies(signal),
});
