import { createRouter } from '@tanstack/react-router';

import { config } from '$/config';
import { DefaultLayout } from '$/router/layouts/default-layout';
import { RootRoute } from '$/router/root-route';
import { DiscoverMoviesRoute } from '$/router/routes/discover-movies-route';
import { MovieDetailRoute } from '$/router/routes/movie-detail-route';

export const router = createRouter({
  scrollRestoration: true,
  defaultPreload: config.router.defaultPreload,
  defaultStaleTime: config.router.defaultStaleTime,
  routeTree: RootRoute.addChildren([
    DefaultLayout.addChildren([DiscoverMoviesRoute, MovieDetailRoute]),
  ]),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
