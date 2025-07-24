import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { MoviePoster } from '$/components/movie-poster';
import { CircularProgress } from '$/components/ui/circular-progress';
import { formatDisplayDate } from '$/lib/date';
import { getRatingColorClassName } from '$/lib/rating';
import type { MovieDetails } from '$/services/movies/movies.mapper';

export type MovieDetailsProps = { movie: MovieDetails };

export const MovieDetailsContent: FC<MovieDetailsProps> = ({ movie }) => {
  const { t } = useTranslation('movie_details');

  const rating = Math.round((movie.vote_average / 10) * 100);
  const formattedDate = formatDisplayDate(movie.release_date);
  const color = getRatingColorClassName(rating);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-xl border bg-card p-4 shadow-sm sm:flex-row">
      <div className="flex flex-col gap-5">
        <Link className="flex items-center gap-2 text-sm" to="/">
          <ArrowLeft />
          <span>{t('back_to_overview')}</span>
        </Link>

        <div className="flex flex-col gap-8 sm:flex-row">
          <div className="flex-shrink-0">
            <MoviePoster
              className="w-full overflow-hidden rounded-lg sm:w-72"
              posterPath={movie.poster_path}
            />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <h1 className="font-bold text-2xl">{movie.title}</h1>
            <div className="flex items-center gap-4">
              <CircularProgress
                colorClassName={color}
                labelClassName="font-bold text-xs"
                showLabel
                size={40}
                strokeWidth={5}
                value={rating}
              />
              <span className="text-muted-foreground text-sm">
                {formattedDate}
              </span>
            </div>
            <p className="text-base text-muted-foreground">{movie.overview}</p>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  className="inline-block rounded-full bg-background px-2 py-1 font-medium text-xs"
                  key={genre.id}
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
