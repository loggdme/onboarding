import type { FC } from 'react';

import {
  MovieCardContent,
  type MovieCardProps,
} from '$/pages/discover-movies-page/components/movie-card/movie-card-content';
import { MovieCardSkeleton } from '$/pages/discover-movies-page/components/movie-card/movie-card-skeleton';

interface Props extends MovieCardProps {
  isLoading: boolean;
}

export const MovieCard: FC<Props> = ({ isLoading, movie }) => {
  if (isLoading) {
    return <MovieCardSkeleton />;
  }

  return <MovieCardContent movie={movie} />;
};
