import * as z from 'zod/mini';

export const QuoteResponseSchema = z.object({
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
  quotes: z.array(
    z.object({
      id: z.number(),
      quote: z.string(),
      author: z.string(),
    }),
  ),
});
