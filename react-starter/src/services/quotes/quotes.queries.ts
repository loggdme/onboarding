import { queryOptions } from '@tanstack/react-query';

import { getAllQuotes } from '$/services/quotes/quotes.fetch';

export const quotesQuery = queryOptions({
  queryKey: ['quotes'],
  queryFn: ({ signal }) => getAllQuotes(signal),
});
