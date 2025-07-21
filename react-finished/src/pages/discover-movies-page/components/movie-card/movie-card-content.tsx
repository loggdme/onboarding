import { Link } from '@tanstack/react-router';
import type { FC } from 'react';

import { MoviePoster } from '$/components/movie-poster';
import { CircularProgress } from '$/components/ui/circular-progress';
import { formatDisplayDate } from '$/lib/date';
import { getRatingColorClassName } from '$/lib/rating';
import type { DiscoverdMovie } from '$/services/movies/movies.mapper';

export type MovieCardProps = { movie: DiscoverdMovie };

export const MovieCardContent: FC<MovieCardProps> = ({ movie }) => {
  const rating = Math.round((movie.vote_average / 10) * 100);
  const color = getRatingColorClassName(rating);
  const formattedDate = formatDisplayDate(movie.release_date);

  return (
    <Link
      className="group focus-visible:outline-none"
      params={{ id: String(movie.id) }}
      to="/movies/$id"
    >
      <div className="flex h-full flex-col gap-6 overflow-hidden rounded-xl border bg-card p-0 text-card-foreground shadow-sm group-focus-visible:outline-3 group-focus-visible:outline-primary group-focus-visible:outline-offset-4">
        <div className="relative">
          <MoviePoster posterPath={movie.poster_path} />
          <div className="-bottom-5 absolute left-5">
            <CircularProgress
              colorClassName={color}
              labelClassName="font-bold text-xs"
              showLabel
              size={40}
              strokeWidth={5}
              value={rating}
            />
          </div>
        </div>

        <div className="my-4 grid gap-1.5 px-6">
          <div className="line-clamp-1 font-semibold leading-none">
            {movie.title}
          </div>
          <div className="text-muted-foreground text-sm">{formattedDate}</div>
        </div>
      </div>
    </Link>
  );
};
