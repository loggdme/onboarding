import { createRoute } from '@tanstack/react-router';
import { MovieDetailPage } from '$/pages/movie-detail-page/movie-detail-page';
import { DefaultLayout } from '$/router/layouts/default-layout';

export const MovieDetailRoute = createRoute({
  path: '/movies/$id',
  getParentRoute: () => DefaultLayout,
  component: MovieDetailPage,
});
