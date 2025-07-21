import { env } from '$/config';
import { DiscoverMovieResponseSchema } from '$/services/movies/movies.mapper';

interface DiscoverMovieOptions {
  page?: number;
}

export const discoverMovies = async (
  signal: AbortSignal,
  options?: DiscoverMovieOptions
) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const url = new URL('https://api.themoviedb.org/3/discover/movie');
  url.searchParams.set('include_adult', 'false');
  url.searchParams.set('include_video', 'false');
  url.searchParams.set('language', 'en-US');
  url.searchParams.set('page', options?.page?.toString() || '1');
  url.searchParams.set('sort_by', 'popularity.desc');

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
