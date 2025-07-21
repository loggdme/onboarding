import { env } from '$/config';
import {
  DiscoverMovieResponseSchema,
  MovieDetailsSchema,
} from '$/services/movies/movies.mapper';

export type DiscoverMovieSortBy = (typeof discoverMovieSortByOptions)[number];
export const discoverMovieSortByOptions = [
  'original_title.asc',
  'original_title.desc',
  'popularity.asc',
  'popularity.desc',
  'revenue.asc',
  'revenue.desc',
  'primary_release_date.asc',
  'title.asc',
  'title.desc',
  'primary_release_date.desc',
  'vote_average.asc',
  'vote_average.desc',
  'vote_count.asc',
  'vote_count.desc',
] as const;

export type DiscoverMovieOptions = {
  page?: number;
  sortBy?: DiscoverMovieSortBy;
};

export const discoverMovies = async (
  signal: AbortSignal,
  options?: DiscoverMovieOptions
) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const url = new URL('https://api.themoviedb.org/3/discover/movie');
  url.searchParams.set('include_adult', 'false');
  url.searchParams.set('include_video', 'false');
  url.searchParams.set('language', 'en-US');
  url.searchParams.set('page', options?.page?.toString() || '1');
  url.searchParams.set('sort_by', options?.sortBy ?? 'popularity.desc');

  const response = await fetch(url, {
    signal,
    headers: { Authorization: `Bearer ${env.VITE_TMDB_API_KEY}` },
  });

  if (!response.ok) {
    throw new Error('failed to fetch movies');
  }

  const rawData = await response.json().catch(() => null);
  if (!rawData) {
    throw new Error('failed to parse movies data');
  }

  const parsed = DiscoverMovieResponseSchema.safeParse(rawData);
  if (!parsed.success) {
    throw new Error('invalid movies data format');
  }

  return parsed.data;
};

export const getMovieDetails = async (signal: AbortSignal, id: string) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);
  url.searchParams.set('language', 'en-US');

  const response = await fetch(url, {
    signal,
    headers: { Authorization: `Bearer ${env.VITE_TMDB_API_KEY}` },
  });

  if (!response.ok) {
    throw new Error('failed to fetch movie details');
  }

  const rawData = await response.json().catch(() => null);
  if (!rawData) {
    throw new Error('failed to parse movie details');
  }

  const parsed = MovieDetailsSchema.safeParse(rawData);
  if (!parsed.success) {
    throw new Error('invalid movie details data format');
  }

  return parsed.data;
};
