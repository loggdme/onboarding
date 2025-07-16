import { Link } from '@tanstack/react-router';
import type { FC } from 'react';

import { Card, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';
import { CircularProgress } from '$/components/ui/circular-progress';
import { cn } from '$/lib/utils';
import type { DiscoverdMovie } from '$/services/movies/movies.mapper';

const _getProgressColor = (rating: number) => {
  if (rating >= 70) return 'stroke-emerald-500';
  if (rating >= 50) return 'stroke-yellow-500';
  return 'stroke-red-500';
};

const _LoadingMovieCard = () => {
  return (
    <div className="animate-pulse rounded-xl bg-accent">
      <Card className="h-full p-0 pb-4 opacity-0">
        <div className="mb-3 aspect-[2/3] w-full bg-red-50" />
        <CardHeader>
          <CardTitle>.</CardTitle>
          <CardDescription>.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export const MovieCard: FC<{ movie: DiscoverdMovie; isLoading?: boolean }> = ({ movie, isLoading }) => {
  if (isLoading) return <_LoadingMovieCard />;

  const rating = Math.round((movie.vote_average / 10) * 100);
  const color = _getProgressColor(rating);
  const formattedDate = new Date(movie.release_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Link className="group focus-visible:outline-none" params={{ id: String(movie.id) }} to="/movies/$id">
      <Card className="h-full overflow-hidden p-0 pb-4 group-focus-visible:outline-3 group-focus-visible:outline-primary group-focus-visible:outline-offset-4">
        <div className="relative mb-3">
          <div className="aspect-[2/3]">
            <img alt={`${movie.title} poster`} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          </div>
          <div className="-bottom-5 absolute left-5">
            <CircularProgress
              className={cn('opacity-20', color)}
              labelClassName="font-bold text-xs"
              progressClassName={color}
              progressStrokeWidth={5}
              showLabel
              size={40}
              strokeWidth={5}
              value={rating}
            />
          </div>
        </div>

        <CardHeader>
          <CardTitle>{movie.title}</CardTitle>
          <CardDescription>{formattedDate}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
