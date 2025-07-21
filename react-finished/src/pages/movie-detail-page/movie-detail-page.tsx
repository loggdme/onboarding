import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { MovieDetailsContent } from '$/pages/movie-detail-page/components/movie-details-content';
import { MovieDetailsSkeleton } from '$/pages/movie-detail-page/components/movie-details-skeleton';
import { movieDetailsQuery } from '$/services/movies/movies.queries';

export const MovieDetailPage = () => {
  const { id } = useParams({ from: '/default-layout/movies/$id' });
  const { data, isLoading } = useQuery(movieDetailsQuery(id));

  if (isLoading || !data) {
    return <MovieDetailsSkeleton />;
  }

  return <MovieDetailsContent movie={data} />;
};
