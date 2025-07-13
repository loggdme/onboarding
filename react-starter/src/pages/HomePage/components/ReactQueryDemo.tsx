import { useQuery } from '@tanstack/react-query';
import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '$/components/ui/alert';
import { quotesQuery } from '$/services/quotes/quotes.queries';

export const ReactQueryDemo = () => {
  const { data, isLoading, isError, error } = useQuery(quotesQuery);

  if (isLoading || isError || !data) {
    return (
      <Alert variant={isLoading ? 'default' : 'destructive'}>
        <AlertCircleIcon />
        <AlertTitle>{isLoading ? 'Loading quotes...' : 'Unable to speak to the backend.'}</AlertTitle>
        <AlertDescription>{isError ? error.message : ''}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert>
      <AlertCircleIcon />
      <AlertTitle>Quotes loaded successfully!</AlertTitle>
      <AlertDescription className="mt-3 flex flex-col gap-4">
        {data.map(({ id, author, quote }) => {
          return (
            <blockquote className=" border-l-2 pl-3 italic" key={id}>
              &quot;{quote}&quot; ~ <strong>{author}:</strong>
            </blockquote>
          );
        })}
      </AlertDescription>
    </Alert>
  );
};
