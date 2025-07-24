import { useTranslation } from 'react-i18next';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '$/components/ui/select';
import { cn } from '$/lib/utils';
import { useDiscoverMovies } from '$/pages/discover-movies-page/hooks/use-discover-movies';
import {
  useDiscoverMovieActions,
  useDiscoverMovieSortBy,
} from '$/pages/discover-movies-page/stores/discover-movie-store';
import {
  type DiscoverMovieSortBy,
  discoverMovieSortByOptions,
} from '$/services/movies/movies.fetch';

export const DiscoverMoviesActiveFilter = () => {
  const { t } = useTranslation(['discover_movies', 'sort_options']);

  const { totalResults, displayedMovies, isLoading } = useDiscoverMovies();
  const { sortResults } = useDiscoverMovieActions();
  const sortBy = useDiscoverMovieSortBy();

  return (
    <div className="mb-3 flex flex-col gap-2 px-2">
      <div className="w-full max-w-72 place-self-end">
        <Select
          onValueChange={(val) => sortResults(val as DiscoverMovieSortBy)}
          value={sortBy}
        >
          <SelectTrigger className="w-full">
            <SelectValue>{t(`sort_options:${sortBy}`)}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            {discoverMovieSortByOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {t(`sort_options:${option}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div
        className={cn(
          'w-fit rounded text-md text-muted-foreground',
          isLoading && 'animate-pulse bg-accent text-transparent'
        )}
      >
        {t('discover_movies:description', { totalResults, displayedMovies })}
      </div>
    </div>
  );
};
