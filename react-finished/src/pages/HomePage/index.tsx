import { useQuery } from '@tanstack/react-query';

import { MovieCard } from '$/pages/HomePage/components/MovieCard';
import { discoverMoviesQuery } from '$/services/movies/movies.queries';

export const HomePage = () => {
  const { data } = useQuery(discoverMoviesQuery);
  if (!data) return;

  return (
    <div className="grid grid-cols-2 gap-6 px-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {data.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
