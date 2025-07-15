import { env } from '$/config';
import { DiscoverMovieResponseSchema } from '$/services/movies/movies.mapper';

export const discoverMovies = async (signal: AbortSignal) => {
  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
  const response = await fetch(url, {
    signal,
    headers: { Authorization: `Bearer ${env.VITE_TMDB_API_KEY}` },
  });

  if (!response.ok) throw new Error('failed to fetch movies');

  const rawData = await response.json().catch(() => undefined);
  if (!rawData) throw new Error('failed to parse movies data');

  const parsed = DiscoverMovieResponseSchema.safeParse(rawData);
  if (!parsed.success) throw new Error('invalid movies data format');

  return parsed.data;
};
