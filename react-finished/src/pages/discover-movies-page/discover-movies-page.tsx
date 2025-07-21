import { DiscoverMoviesActiveFilter } from '$/pages/discover-movies-page/components/discover-movies-active-filter';
import { DiscoverMoviesHeader } from '$/pages/discover-movies-page/components/discover-movies-header';
import { DiscoverMovieResults } from '$/pages/discover-movies-page/components/discover-movies-results';

export const DiscoverMoviesPage = () => {
  return (
    <div>
      <DiscoverMoviesHeader />
      <DiscoverMoviesActiveFilter />
      <DiscoverMovieResults />
    </div>
  );
};
