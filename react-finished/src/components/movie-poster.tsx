import { ImageOff } from 'lucide-react';
import type { FC } from 'react';

import { cn } from '$/lib/utils';

export type MoviePosterProps = {
  posterPath: string | null;
  className?: string;
};

export const MoviePoster: FC<MoviePosterProps> = ({
  posterPath,
  className,
}) => {
  return (
    <div className={cn('aspect-[2/3]', className)}>
      {posterPath && (
        <img
          alt="movie poster"
          className="w-full"
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
        />
      )}
      {!posterPath && (
        <div className="flex h-full w-full items-center justify-center bg-accent">
          <ImageOff className="size-12 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};
