import { useInfiniteQuery } from '@tanstack/react-query';

import { useDiscoverMovieSortBy } from '$/pages/discover-movies-page/stores/discover-movie-store';
import { discoverMoviesQuery } from '$/services/movies/movies.queries';

export const useDiscoverMovies = () => {
  const sortBy = useDiscoverMovieSortBy();

  const query = useInfiniteQuery(discoverMoviesQuery({ sortBy }));

  const totalResults = query.data ? query.data.pages[0].total_results : 0;
  const allMovies = query.data
    ? query.data.pages.flatMap((d) => d.results)
    : [];

  return {
    ...query,
    totalResults,
    displayedMovies: allMovies.length,
    allMovies,
  };
};
