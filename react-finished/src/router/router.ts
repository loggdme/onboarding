import { createRouter } from '@tanstack/react-router';

import { config } from '$/config';
import { DefaultLayout } from '$/router/layouts/default-layout';
import { RootRoute } from '$/router/root-route';
import { HomepageRoute } from '$/router/routes/homepage-route';
import { MovieDetailRoute } from '$/router/routes/movie-detail-route';

export const router = createRouter({
  defaultPreload: config.router.defaultPreload,
  defaultStaleTime: config.router.defaultStaleTime,
  routeTree: RootRoute.addChildren([
    DefaultLayout.addChildren([HomepageRoute, MovieDetailRoute]),
  ]),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
