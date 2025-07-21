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
    cardGap: 16,
    cardColumns: [
      { maxWidth: 1536, columns: 5 },
      { maxWidth: 1280, columns: 5 },
      { maxWidth: 1024, columns: 4 },
      { maxWidth: 768, columns: 3 },
      { maxWidth: 640, columns: 2 },
    ],
    ratingThresholds: {
      good: 70,
      okay: 50,
    },
  },
};
