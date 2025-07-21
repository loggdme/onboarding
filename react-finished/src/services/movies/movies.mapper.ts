import * as z from 'zod/mini';

export type DiscoverdMovie = z.infer<
  typeof DiscoverMovieResponseSchema
>['results'][number];
export const DiscoverMovieResponseSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      poster_path: z.nullable(z.string()),
      release_date: z.string(),
      overview: z.string(),
      vote_average: z.number(),
      vote_count: z.number(),
    })
  ),
});

export type MovieDetails = z.infer<typeof MovieDetailsSchema>;
export const MovieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.nullable(z.string()),
  release_date: z.string(),
  overview: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});
