import * as z from 'zod/mini';

export const env = z
  .object({ VITE_TMDB_API_KEY: z.string().check(z.minLength(1)) })
  .parse(import.meta.env);

export const config = {
  queryClient: {
    defaultRetry: 3,
    defaultStaleTime: 1000 * 60 * 10,
  },
  router: {
    defaultPreload: 'intent' as const,
    defaultStaleTime: 1000 * 60 * 10,
  },
  discoverMoviePage: {
    ratingThresholds: {
      good: 70,
      okay: 50,
    },
  },
};
