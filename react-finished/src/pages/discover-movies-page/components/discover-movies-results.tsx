import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { config } from '$/config';
import type { Breakpoint } from '$/lib/utils';
import { MovieCard } from '$/pages/discover-movies-page/components/movie-card/movie-card';
import { useDiscoverMovies } from '$/pages/discover-movies-page/hooks/use-discover-movies';

export const DiscoverMovieResults = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>({
    maxWidth: 0,
    columns: 1,
  });

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useDiscoverMovies();

  const allMovies = data ? data.pages.flatMap((d) => d.results) : [];

  const onSetBreakpoint = useCallback(() => {
    const b = config.discoverMoviePage.cardColumns.find(
      (bp) => window.innerWidth >= bp.maxWidth
    );
    setBreakpoint(b ? b : { maxWidth: 0, columns: 1 });
  }, []);

  const rows = useMemo(() => {
    if (breakpoint.columns === 0 || allMovies.length === 0) {
      return 5;
    }
    return Math.max(Math.ceil(allMovies.length / breakpoint.columns), 5);
  }, [allMovies.length, breakpoint]);

  const rowVirtualizer = useWindowVirtualizer({
    gap: config.discoverMoviePage.cardGap,
    count: rows,
    overscan: 1,
    paddingEnd: 20,
    estimateSize: () => 42 + 24 + (parentRef.current?.clientWidth ?? 0) / 2 / 3,
  });

  const rowItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastRowItem = rowItems.at(-1);
    if (
      lastRowItem &&
      lastRowItem.index >=
        Math.floor(allMovies.length / breakpoint.columns) - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allMovies.length,
    isFetchingNextPage,
    rowItems,
    breakpoint.columns,
  ]);

  useEffect(() => {
    onSetBreakpoint();
    window.addEventListener('resize', onSetBreakpoint);
    return () => window.removeEventListener('resize', onSetBreakpoint);
  }, [onSetBreakpoint]);

  return (
    <div ref={parentRef}>
      <div
        className="relative will-change-transform"
        style={{ height: rowVirtualizer.getTotalSize(), contain: 'paint' }}
      >
        {rowItems.map((row) => {
          const isLoaderRow = row.index === rows - 1 && hasNextPage;

          return (
            <div
              className="absolute top-0 left-0 grid w-full px-2"
              data-index={row.index}
              key={row.key}
              ref={rowVirtualizer.measureElement}
              style={{
                transform: `translateY(${row.start - rowVirtualizer.options.scrollMargin}px)`,
                gap: `${config.discoverMoviePage.cardGap}px`,
                gridTemplateColumns: `repeat(${breakpoint.columns}, minmax(0, 1fr))`,
              }}
            >
              {[...new Array(breakpoint.columns).keys()].map((column) => (
                <MovieCard
                  isLoading={isLoaderRow || !data}
                  key={column}
                  movie={allMovies[breakpoint.columns * row.index + column]}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
