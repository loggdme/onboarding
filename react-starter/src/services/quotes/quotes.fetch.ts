import { QuoteResponseSchema } from '$/services/quotes/quotes.mapper';

export const getAllQuotes = async (signal: AbortSignal) => {
  // TODO: Demonstration deploy to show the loading state and error handling
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch('https://dummyjson.com/quotes?limit=5', { signal });
  if (!response.ok) throw new Error('failed to fetch quotes');

  const rawData = await response.json().catch(() => undefined);
  if (!rawData) throw new Error('failed to parse quotes data');

  const parsed = QuoteResponseSchema.safeParse(rawData);
  if (!parsed.success) throw new Error('invalid quotes data format');

  return parsed.data.quotes;
};
