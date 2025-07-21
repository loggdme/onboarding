import { createRoute } from '@tanstack/react-router';

import { DiscoverMoviesPage } from '$/pages/discover-movies-page/discover-movies-page';
import { DefaultLayout } from '$/router/layouts/default-layout';

export const DiscoverMoviesRoute = createRoute({
  path: '/',
  getParentRoute: () => DefaultLayout,
  component: DiscoverMoviesPage,
});
