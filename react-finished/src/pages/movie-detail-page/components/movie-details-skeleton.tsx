import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export const MovieDetailsSkeleton = () => {
  return (
    <div className="mx-auto flex max-w-3xl animate-pulse flex-col gap-8 rounded-xl border bg-card p-4 shadow-sm sm:flex-row">
      <div className="flex w-full flex-col gap-5">
        <Link className="flex items-center gap-2 text-sm" to="/">
          <ArrowLeft />
          <span>Back to Overview</span>
        </Link>

        <div className="flex flex-col gap-8 sm:flex-row">
          <div className="flex-shrink-0">
            <div className="aspect-[2/3] w-full rounded-xl bg-accent sm:w-72" />
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div className="h-8 w-48 rounded bg-accent" />
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-accent" />
              <div className="h-5 w-20 rounded bg-accent" />
            </div>
            <div className="h-16 w-full rounded bg-accent" />
            <div className="mt-2 flex flex-wrap gap-2">
              {[...new Array(3).keys()].map((key) => (
                <div
                  className="inline-block h-6 w-16 rounded-full bg-accent"
                  key={key}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
