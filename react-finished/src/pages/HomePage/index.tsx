import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer, useWindowVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useMemo, useRef } from 'react';

import { MovieCard } from '$/pages/HomePage/components/MovieCard';
import { discoverMoviesQuery } from '$/services/movies/movies.queries';

const gap = 16;
const breakpoint = { maxWidth: 672, columns: 5 };

// https://github.com/TanStack/virtual/discussions/710
// TODO: Use a more accurate estimate based on the actual movie card size
// TODO: Add breakpoints for different screen sizes
// TODO: Test for mobile devices

export const HomePage = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(discoverMoviesQuery);
  const allMovies = data ? data.pages.flatMap((d) => d.results) : [];

  const rows = useMemo(() => {
    if (breakpoint.columns === 0 || allMovies.length === 0) return 5;
    const total = Math.max(Math.ceil(allMovies.length / breakpoint.columns), 1);
    return hasNextPage ? total + 1 : total;
  }, [allMovies.length, hasNextPage]);

  const estimatedSize = useMemo(() => {
    return (breakpoint.maxWidth - (breakpoint.columns - 1) * gap) / breakpoint.columns;
  }, []);

  const rowVirtualizer = useWindowVirtualizer({
    gap,
    count: rows,
    paddingStart: 8,
    paddingEnd: 8,
    overscan: 0,
    scrollMargin: parentRef.current?.offsetTop ?? 0,
    estimateSize: () => 534,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    paddingStart: 8,
    paddingEnd: 8,
    count: breakpoint.columns,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedSize,
  });

  const rowItems = rowVirtualizer.getVirtualItems();
  const columnItems = columnVirtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...rowItems].reverse();
    if (!lastItem) return;
    if (lastItem.index >= Math.floor(allMovies.length / breakpoint.columns) - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, allMovies.length, isFetchingNextPage, rowItems]);

  return (
    <div ref={parentRef}>
      <div className="relative will-change-transform" style={{ height: rowVirtualizer.getTotalSize(), contain: 'paint' }}>
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
                gap: `${gap}px`,
                gridTemplateColumns: `repeat(${breakpoint.columns}, minmax(0, 1fr))`,
              }}
            >
              {columnItems.map((column) => (
                <div data-index={column.index} key={column.key} ref={columnVirtualizer.measureElement}>
                  <MovieCard isLoading={isLoaderRow || !data} movie={allMovies[breakpoint.columns * row.index + column.index]} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
